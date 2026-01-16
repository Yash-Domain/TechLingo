import OpenAI from "openai";

/**
 * Singleton OpenRouter client
 */
let client = null;

function getClient() {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "TechLingo",
      },
    });
  }
  return client;
}

/**
 * Clean + parse AI output like your LeetCode backend
 */
function sanitizeAndParseAIResponse(rawText) {
  try {
    let text = rawText
      .replace(/```json/i, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch {
    return null;
  }
}

/**
 * Generate Day content via AI
 * - returns PARSED OBJECT or null
 * - NO validation here
 */
export async function generateDayContent(systemPrompt, userPayload) {
  const openai = getClient();

  const response = await openai.chat.completions.create({
    model: "tngtech/deepseek-r1t2-chimera:free", // explicit free model
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `
Return STRICT JSON only.
No markdown.
No explanations.
Do not return empty objects.

Required JSON structure (ALL fields mandatory):

{
  "day": number,
  "title": string,
  "core_concept": {
    "summary": string,
    "detailed_explanation": string
  },
  "comparison": [
    {
      "concept": string,
      "cpp": string,
      "python": string,
      "mental_model": string
    }
  ],
  "common_mistakes": string[],
  "practice_questions": [
    {
      "question": string,
      "expected_thinking": string
    }
  ],
  "unlock_condition": string
}

Day request:
${JSON.stringify(userPayload)}
        `.trim(),
      },
    ],
    temperature: 0.2,
  });

  const rawContent = response?.choices?.[0]?.message?.content;

  if (!rawContent) {
    return null;
  }

  return sanitizeAndParseAIResponse(rawContent);
}
