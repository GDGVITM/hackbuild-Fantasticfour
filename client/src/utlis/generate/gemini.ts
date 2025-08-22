"use client";

import { GoogleGenAI } from "@google/genai";

// Rate limiter configuration
const MAX_CALLS_PER_MINUTE = 14;
const MINUTE_IN_MS = 60 * 1000;

// Initialize the API with your API key
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Missing Gemini API key. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file");
}

// console.log("Using Gemini API key:", API_KEY);

const genAI = new GoogleGenAI({
  apiKey: API_KEY});

/**
 * Sleep for the specified duration
 * @param {number} ms - Duration to sleep in milliseconds
 * @returns {Promise<void>}
 */
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

function extractJsonFromResponse(text: string): string {
  const startIndex = text.indexOf("```json");
  const endIndex = text.lastIndexOf("```");

  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    return text.substring(startIndex + 7, endIndex).trim(); // 7 = length of "```json"
  }

  return text.trim(); // fallback: return full text
}

// Improved rate limiter: avoid hitting the limit by spacing calls evenly
const CALL_INTERVAL_MS = Math.ceil(MINUTE_IN_MS / MAX_CALLS_PER_MINUTE);
let lastCallTime = 0;

async function rateLimitSafe(): Promise<void> {
  const now = Date.now();
  const timeSinceLast = now - lastCallTime;
  if (timeSinceLast < CALL_INTERVAL_MS) {
    await sleep(CALL_INTERVAL_MS - timeSinceLast);
  }
  lastCallTime = Date.now();
}

function isRateLimitError(error: unknown): boolean {
  if (!error) return false;
  if (typeof error === 'object' && error !== null) {
    // @ts-expect-error Gemini API error shape may have response.status
    if (error.response && error.response.status === 429) return true;
    // @ts-expect-error Gemini API error shape may have message string
    if (typeof error.message === 'string' && error.message.toLowerCase().includes('rate limit')) return true;
  }
  return false;
}

function isServiceUnavailableError(error: unknown): boolean {
  if (!error) return false;
  if (typeof error === 'object' && error !== null) {
    // @ts-expect-error Gemini API error shape may have status
    if (error.status === 503) return true;
    // @ts-expect-error Gemini API error shape may have message string
    if (typeof error.message === 'string' && error.message.toLowerCase().includes('overloaded')) return true;
    // @ts-expect-error Gemini API error shape may have message string
    if (typeof error.message === 'string' && error.message.toLowerCase().includes('unavailable')) return true;
  }
  return false;
}

/**
 * Function that takes a prompt as input and returns the output from Gemini-1.5-flash model
 * Each call creates a new chat instance, so there's no persistent memory between calls
 * Rate limited to 14 calls per minute, will wait if rate limit is reached
 */
export async function getGeminiResponse(prompt: string, isJson: boolean = true): Promise<string> {
  let retryCount = 0;
  const maxRetries = 3;
  
  while (retryCount < maxRetries) {
    try {
      await rateLimitSafe();
      
      const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash-lite-001",
        contents: prompt,
      });

      if (!response || !response.text) {
        throw new Error("No response text received from Gemini API");
      }

      let outputText = response.text.trim();

      console.log("Raw output text:", outputText);

      if (isJson) {
        try {
          JSON.parse(outputText);
        } catch {
          outputText = extractJsonFromResponse(outputText);
          // Try parsing again after extraction
          try {
            JSON.parse(outputText);
          } catch {
            throw new Error("Could not extract valid JSON from response");
          }
        }
      }

      console.log("Prompt:", prompt.substring(0, 200) + "...");
      console.log("Response:", outputText.substring(0, 200) + "...");

      return outputText;
    } catch (error) {
      retryCount++;
      
      if (isRateLimitError(error)) {
        console.warn("Rate limit hit, retrying in 10s...");
        await sleep(10000);
        retryCount--; // Don't count rate limit as a retry
        continue;
      }
      
      if (isServiceUnavailableError(error)) {
        console.warn(`Service unavailable (attempt ${retryCount}/${maxRetries}), retrying in ${5 * retryCount}s...`);
        if (retryCount < maxRetries) {
          await sleep(5000 * retryCount);
          continue;
        }
      }
      
      console.error(`Error in Gemini API (attempt ${retryCount}/${maxRetries}):`, error);
      
      if (retryCount >= maxRetries) {
        console.error("Max retries exceeded, falling back to default content");
        if (isJson) {
          // Return a basic error structure for JSON requests
          return JSON.stringify({ error: "service_unavailable", message: "Gemini API is currently unavailable. Using fallback content." });
        } else {
          return "I apologize, but the AI service is currently unavailable. Please try again later.";
        }
      }
      
      // Wait before retry
      await sleep(2000 * retryCount);
    }
  }
  
  // This should never be reached, but just in case
  console.error("Unexpected end of retry loop");
  return isJson ? JSON.stringify({ error: "max_retries_exceeded" }) : "Sorry, I encountered an error processing your request.";
}