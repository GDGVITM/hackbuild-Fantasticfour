import { getGeminiResponse } from "../generate/gemini";
import { TimeSlot } from "../../lib/timetableData";

/**
 * Beautifies OCR timetable text into structured timetable JSON.
 * @param ocrText Raw OCR text containing a weekly timetable.
 * @returns Promise resolving to a timetable object in SAMPLE_TIMETABLE format.
 */
export async function beautifyOCRTimetable(
  ocrText: string
): Promise<{ [key: string]: TimeSlot[] }> {
  const commonRules = `
- Only respond with the timetable in JSON format.
- Do not include any additional text or explanations.
- Do not include any markdown formatting.
- Ensure the JSON is valid and properly formatted.
- Don't add extra elements in the output JSON array.
- Make sure to use proper JSON formatting and use escaping where necessary.
`;

  const jsonFormat = `
{
  "Monday": [
    { "time": "string", "subject": "string (optional)", "room": "string (optional)", "teacher": "string (optional)", "type": "class|break|free|exam|lab (optional)" },
    ...
  ],
  "Tuesday": [
    ...
  ],
  ...
}
`;

  const jsonFormatExample = `
{
  "Monday": [
    { "time": "9:00 AM", "subject": "Advanced Mathematics", "room": "Room 101", "teacher": "Dr. Smith", "type": "class" },
    { "time": "10:30 AM", "subject": "Physics Lab", "room": "Physics Lab 2", "teacher": "Prof. Johnson", "type": "lab" },
    { "time": "12:00 PM", "subject": "Lunch Break", "type": "break" },
    ...
  ],
  "Tuesday": [
    ...
  ],
  ...
}
`;

  const advancedRules = `
- Each day is a key, and the value is an array of TimeSlot objects.
- Each TimeSlot object has: time (string), subject (string, optional), room (string, optional), teacher (string, optional), type (one of: "class", "break", "free", "exam", "lab").
- If a field is missing in the OCR, leave it out.
- If you cannot determine the type, leave it blank or omit it.
- Use the closest matching type if the OCR text is ambiguous (e.g., "Lunch" is "break").
- Only respond with the JSON, no extra text or explanation.
- Ensure the JSON is valid and properly formatted.
`;

  const prompt = `
You are an expert at extracting structured data from raw OCR text. The OCR text contains a weekly timetable, possibly messy or unformatted.

Your task:
- Parse the OCR text and extract a weekly timetable.

Here are some common rules you must follow:
${commonRules}

Here are some advanced rules for extraction:
${advancedRules}

Here is the JSON format you must follow:
${jsonFormat}

Here is an example of the expected JSON format:
${jsonFormatExample}

Here is the OCR text:
${ocrText}
`;

  try {
    const response = await getGeminiResponse(prompt, true);
    return JSON.parse(response);
  } catch (error) {
    console.error("Error beautifying OCR timetable:", error);
    return {};
  }
}
