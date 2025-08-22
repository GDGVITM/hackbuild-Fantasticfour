import { getGeminiResponse } from "../generate/gemini";

export type atsResponse = {
  score: number;  // out of 100
  feedback: string; // Provide constructive feedback on the resume, highlighting strengths and areas for improvement. Consider aspects such as relevance to the job description, clarity, formatting, and keyword usage.
  suggestions: string[]; // Provide specific suggestions to improve the resume to better match the job description. These could include adding certain keywords, rephrasing sections, or changing the format.
}

export async function getATSScore(resumeText: string, jobDescription: string) {
  const commondRules = `
  - Only respond with the course slide in JSON format.
  - Do not include any additional text or explanations.
  - Do not include any markdown formatting.
  - Ensure the JSON is valid and properly formatted.
  - Don't add extra elements in the output json array
  - Make sure to use proper JSON formatting and use escaping where necessary.
  `;

  const jsonFormat = `
  {
    "score": number,  \\ out of 100
    "feedback": string \\ Provide constructive feedback on the resume, highlighting strengths and areas for improvement. Consider aspects such as relevance to the job description, clarity, formatting, and keyword usage.,
    "suggestions": string[] \\ Provide specific suggestions to improve the resume to better match the job description. These could include adding certain keywords, rephrasing sections, or changing the format.
  }
  `;

  const advancedRules = `
  - The score should be out of 100 and should reflect how well the resume matches the job description
  - The feedback should be detailed and cover various aspects of the resume, including strengths and areas for improvement
  - The suggestions should be actionable and specific, providing clear guidance on how to enhance the resume
  - Assume that the resume is not good enough unless it perfectly matches the job description
  - Don't put too much unnecessary content in your response, keep it concise and to the point. Like don't say Good job, your answer was correct or "That's a great answer!" or "That's a great overview". Just say next question (This is important to maintain professionalism and keep the interview on track)`;

  const fullPrompt = `
  You are an ATS (Applicant Tracking System) bot that evaluates resumes based on a given job description. Your task is to analyze the resume, compare it with the job description, and provide a score along with feedback and suggestions for improvement.

  Here is the job description:
  ${jobDescription}

  Here is the resume text:
  ${resumeText}

  Here are some common rules you must follow:
  ${commondRules}

  ${advancedRules}

  Here is the JSON format you must follow:
  ${jsonFormat}

  Analyze the resume and job description, then provide the score, feedback, and suggestions in the specified JSON format.
  `;

  try {
    const response = await getGeminiResponse(fullPrompt);
    const atsResponse: atsResponse = JSON.parse(response);
    return atsResponse;
  } catch (error) {
    // fallback in case of error
    return { score: 0, feedback: "Error in processing the resume. Please ensure the resume and job description are valid.", suggestions: [] };
  }
}