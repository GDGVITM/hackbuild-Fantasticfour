from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import asyncio
import httpx
import json
import re

router = APIRouter()

# Rate limiter configuration
MAX_CALLS_PER_MINUTE = 14
MINUTE_IN_MS = 60 * 1000
CALL_INTERVAL_MS = (MINUTE_IN_MS + MAX_CALLS_PER_MINUTE - 1) // MAX_CALLS_PER_MINUTE

_api_key = os.getenv("GEMINI_API_KEY") or os.getenv("NEXT_PUBLIC_GEMINI_API_KEY")
if not _api_key:
    raise RuntimeError("Missing Gemini API key. Please add GEMINI_API_KEY (or NEXT_PUBLIC_GEMINI_API_KEY) to your environment")

# Simple globals to enforce spacing between calls
_last_call_time = 0
_lock = asyncio.Lock()

class GenerationRequest(BaseModel):
    prompt: str
    isJson: bool = True


def _extract_json_from_text(text: str) -> str:
    # Try to find a ```json ... ``` block
    m = re.search(r"```json\s*(.*?)```", text, re.S | re.I)
    if m:
        return m.group(1).strip()
    # fallback: try to find a JSON object / array in the text
    m2 = re.search(r"(\{[\s\S]*\}|\[[\s\S]*\])", text)
    if m2:
        return m2.group(1).strip()
    return text.strip()


async def _rate_limit_safe():
    global _last_call_time
    async with _lock:
        now = int(asyncio.get_event_loop().time() * 1000)
        time_since_last = now - _last_call_time
        if time_since_last < CALL_INTERVAL_MS:
            wait_ms = CALL_INTERVAL_MS - time_since_last
            await asyncio.sleep(wait_ms / 1000.0)
        _last_call_time = int(asyncio.get_event_loop().time() * 1000)


async def _call_gemini(prompt: str) -> str:
    # Endpoint using Generative Language API (REST key-based)
    endpoint = (
        "https://generativelanguage.googleapis.com/v1beta2/models/gemini-2.0-flash-lite-001:generate"
    )
    params = {"key": _api_key}

    payload = {
        "prompt": {"text": prompt},
        "temperature": 0.2,
        "maxOutputTokens": 1024,
    }

    async with httpx.AsyncClient() as client:
        resp = await client.post(endpoint, params=params, json=payload, timeout=30.0)
        resp.raise_for_status()
        return resp.text


@router.post("/")
async def generate(req: GenerationRequest):
    """Generate content from Gemini. POST body: { prompt: string, isJson?: boolean }

    Returns JSON { result: string } on success or raises HTTPException on error.
    """
    prompt = req.prompt
    is_json = req.isJson

    if not prompt or not prompt.strip():
        raise HTTPException(status_code=400, detail="Missing prompt")

    max_retries = 3
    attempt = 0

    while attempt < max_retries:
        attempt += 1
        try:
            await _rate_limit_safe()
            raw_text = await _call_gemini(prompt)

            # Try to extract text content from the response body
            try:
                parsed = json.loads(raw_text)
            except Exception:
                # If not JSON, attempt to parse out text fields that the API may return
                parsed = None

            output_text = None
            if parsed:
                # Try a few common locations for generated text
                if isinstance(parsed, dict):
                    # candidates -> content -> text
                    candidates = parsed.get("candidates")
                    if isinstance(candidates, list) and len(candidates) > 0:
                        c = candidates[0]
                        if isinstance(c, dict):
                            content = c.get("content")
                            if isinstance(content, list) and len(content) > 0 and isinstance(content[0], dict):
                                output_text = content[0].get("text")
                    # fallback: output -> text
                    if output_text is None:
                        if "output" in parsed and isinstance(parsed["output"], list) and parsed["output"]:
                            out0 = parsed["output"][0]
                            if isinstance(out0, dict) and "content" in out0 and isinstance(out0["content"], list):
                                c0 = out0["content"][0]
                                if isinstance(c0, dict):
                                    output_text = c0.get("text")
                    # last resort: a `text` field
                    if output_text is None and "text" in parsed:
                        output_text = parsed.get("text")

            if output_text is None:
                # Try to extract from raw_text using regex or return raw_text
                extracted = _extract_json_from_text(raw_text)
                output_text = extracted

            output_text = output_text.strip() if isinstance(output_text, str) else str(output_text)

            if is_json:
                # Validate that output_text is valid JSON or try extraction from markdown
                try:
                    json.loads(output_text)
                except Exception:
                    maybe = _extract_json_from_text(output_text)
                    try:
                        json.loads(maybe)
                        output_text = maybe
                    except Exception:
                        raise HTTPException(status_code=502, detail="Could not extract valid JSON from Gemini response")

            return {"result": output_text}

        except httpx.HTTPStatusError as exc:
            status = exc.response.status_code
            text = exc.response.text
            # Rate limit or server errors: retry with backoff
            if status == 429:
                # Wait and retry without consuming an attempt
                await asyncio.sleep(10.0)
                attempt -= 1
                continue
            if status in (503, 502):
                if attempt < max_retries:
                    await asyncio.sleep(5 * attempt)
                    continue
            raise HTTPException(status_code=502, detail={"error": "Gemini API error", "status": status, "body": text})
        except Exception as exc:
            # If we've exhausted retries, return a fallback
            if attempt >= max_retries:
                if is_json:
                    return {"result": json.dumps({"error": "service_unavailable", "message": "Gemini API unavailable. Using fallback content."})}
                else:
                    return {"result": "I apologize, but the AI service is currently unavailable. Please try again later."}
            # Otherwise wait and retry
            await asyncio.sleep(2 * attempt)
            continue

    raise HTTPException(status_code=500, detail="Unexpected error in generation loop")
