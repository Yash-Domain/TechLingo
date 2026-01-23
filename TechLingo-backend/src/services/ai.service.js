import OpenAI from "openai";

/**
 * Clean + parse AI output
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
 * - apiKey: decrypted OpenRouter API key (PER USER)
 * - model: user-selected model
 */
export async function generateDayContent({
  systemPrompt,
  userPayload,
  apiKey,
  model,
}) {
  // 🔐 Create OpenAI client PER REQUEST (BYOK)
  const openai = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://techlingo.app",
      "X-Title": "TechLingo",
    },
  });

  const response = await openai.chat.completions.create({
    model,
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
