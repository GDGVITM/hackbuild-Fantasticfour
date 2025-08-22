"use client";

/**
 * Function that takes a prompt as input and returns the output from external Gemini API
 */
export async function getGeminiResponse(prompt: string, isJson: boolean = true): Promise<string> {
  try {
    const response = await fetch('https://fantasticfour.onrender.com/genai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        isJson: isJson
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.result) {
      throw new Error("No result received from API");
    }

    console.log("Prompt:", prompt.substring(0, 200) + "...");
    console.log("Response:", data.result.substring(0, 200) + "...");

    return data.result;
  } catch (error) {
    console.error("Error calling external Gemini API:", error);
    
    if (isJson) {
      return JSON.stringify({ 
        error: "service_unavailable", 
        message: "External AI service is currently unavailable. Please try again later." 
      });
    } else {
      return "I apologize, but the AI service is currently unavailable. Please try again later.";
    }
  }
}