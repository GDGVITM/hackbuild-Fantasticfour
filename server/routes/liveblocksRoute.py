from fastapi import APIRouter, HTTPException
import os
import uuid
import httpx

router = APIRouter()

# Liveblocks secret key from environment variable
LIVEBLOCKS_SECRET = os.getenv("LIVEBLOCKS_SECRET_KEY")
# Allow overriding the Liveblocks API URL via env var (useful for testing)
# Default to the correct v2 authorize URL
LIVEBLOCKS_API = os.getenv("LIVEBLOCKS_API_URL", "https://api.liveblocks.io/v2/authorize-user")

@router.post("/auth")
async def auth():
    """Create a short-lived Liveblocks authentication token for an anonymous user.

    This endpoint proxies the Liveblocks /v2/authorize API using the secret key stored in
    the environment. It returns the JSON response from Liveblocks directly.
    """
    if not LIVEBLOCKS_SECRET:
        raise HTTPException(status_code=500, detail="Liveblocks secret not configured")

    user_id = str(uuid.uuid4())

    # v2-style payload for Liveblocks /v2/authorize
    payload = {
        "userId": user_id,
        "userInfo": {"name": f"anon-{user_id[:8]}", "color": "#D583F0"},
        "permissions": {"my-room": ["room:write"]},
    }

    headers = {"Authorization": f"Bearer {LIVEBLOCKS_SECRET}"}

    try:
        async with httpx.AsyncClient() as client:
            resp = await client.post(LIVEBLOCKS_API, json=payload, headers=headers, timeout=10.0)
    except httpx.RequestError as exc:
        raise HTTPException(status_code=502, detail={"error": f"Failed to connect to Liveblocks: {str(exc)}"})

    # Success
    if resp.status_code in (200, 201):
        try:
            return resp.json()
        except Exception:
            return {"token_response_text": resp.text}

    # Handle error response
    try:
        body = resp.json()
    except Exception:
        body = resp.text
    raise HTTPException(status_code=502, detail={"error": {"endpoint": LIVEBLOCKS_API, "status": resp.status_code, "body": body}})