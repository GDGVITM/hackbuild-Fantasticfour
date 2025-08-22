import { getGeminiResponse } from "../generate/gemini";
import { mockInterviewResponse } from "./type";

export const getMockInterviewResponse = async (
  prompt: string, 
  previousResponses: mockInterviewResponse | null, 
  customInstructions: string = "",
  interviewPrompt: string = "This is a software engineering interview for a tech company position.",
  outOfMarks: number = 25
  ): Promise<mockInterviewResponse> => {
    const commonRules = `
  - Only respond with the course slide in JSON format.
  - Do not include any additional text or explanations.
  - Do not include any markdown formatting.
  - Ensure the JSON is valid and properly formatted.
  - Create a balanced mix of content and interactive elements.
  - Don't add extra elements in the output json array
  - Make sure to use proper JSON formatting and use escaping where necessary.
  `;

  const jsonFormat = `
  {
    "score": number,  \\ out of ${outOfMarks} increase or decrease based on the your previous question and candidate's response
    "memory": string[],  \\ array of string for storing summary of evaluations of candidate or any thing you want to remember. First copy the previous memory and append new memory to it.
    "response": string, \\ the response to the candidate's question. Your response should include the next interview question or follow-up question based on their response. Dont put feedback here, feedback should be in memory only.,
    "feedback": string \\ Provide constructive feedback on the candidate's response, highlighting strengths and areas for improvement. Consider aspects such as clarity, relevance, depth of understanding, and communication skills.
  }
  `;

  const advancedRules = `
  - The score should be out of ${outOfMarks} and should reflect the quality of the candidate's response
  - The memory array should store concise summaries of the candidate's performance and any important details to remember
  - The memory should be updated with each interaction to build a comprehensive profile of the candidate's strengths and areas for improvement
  - You do not need to ask for candidate's consent to store memory
  - You do not need to copy previous memory word by word, you can summarize it like if previous memory is ["You are good at problem solving", "You need to improve communication skills"], you can summarize it as ["Good problem solving skills", "Needs improvement in communication skills"]. Also can cluster similar points together.
  - Don't deduct marks for spelling mistakes as it can be caused by speech to text errors.
  - Deduct marks for unrelated answers, lack of clarity, poor structure, and failure to address the question.
  - You can also choose to not change the score.
  - You can change the question instead of asking the follow ups to better judge the candidate's skills.
  - Don't put too much unnecessary content in your response, keep it concise and to the point. Like don't say Good job, your answer was correct or "That's a great answer!" or "That's a great overview". Just say next question (This is important to maintain professionalism and keep the interview on track)`;

  const fullPrompt = `
  You are a mock interview bot conducting a interview. Your task is to ask questions, evaluate responses, and provide feedback to help the user improve their interview skills.

  Here is the information about the type of interview:
  ${interviewPrompt}

  Here are some common rules you must follow:
  ${commonRules}

  ${customInstructions? `Here are some custom instructions for this interview:\n${customInstructions}` : ""}

  ${previousResponses? 
  `Here is your previous response from the mock interview:\n${JSON.stringify(previousResponses)}

  Candidate's new response: ${prompt}

  Use this information to inform your next question and feedback.` : 
  "This is the start of the interview, you have no previous memory or context."}

  Here are some advanced rules for scoring and memory management:
  ${advancedRules}

  Always respond in the following JSON format:
  ${jsonFormat}
  `;

  try {
    const response = await getGeminiResponse(fullPrompt, true);
    console.log("Prompt:", fullPrompt);
    console.log("Mock interview response:", response);
    const parsedResponse = JSON.parse(response) as mockInterviewResponse;
    return parsedResponse;
  } catch (error) {
    console.error("Error getting mock interview response:", error);
    // Return a default response in case of error
    return { score: Math.floor(outOfMarks / 2), memory: previousResponses ? previousResponses.memory : [], response: "I apologize, but I am currently unable to process your request. Please try again later.", feedback: "The AI service is currently unavailable. Using fallback content."};
  }

};