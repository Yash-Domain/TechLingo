import DayContent from "../models/DayContent.model.js";
import { DayContentSchema } from "../validators/dayContent.schema.js";
import { generateDayContent } from "./ai.service.js";

const SYSTEM_PROMPT = `
You are an educational content generator.
Your task is to generate day-wise programming language transfer content from C++ to Python.
You must strictly follow the provided JSON schema.
Rules:
- Output ONLY valid JSON
- Do NOT add extra fields
- Do NOT remove required fields
- Do NOT include markdown or explanations outside JSON
- Assume the learner already knows C++
- Focus on mental model transfer, not syntax listing
- Keep content beginner-friendly
- Do NOT introduce advanced Python topics
If unsure, produce the simplest correct content that fits the schema.
`;

/**
 * 🔧 NORMALIZATION (THIS FIXES ZOD)
 */
function normalizeDayContent(raw) {
  return {
    day: raw.day,
    title: raw.title,

    core_concept: {
      summary: raw.core_concept?.summary ?? "",
      detailed_explanation: raw.core_concept?.detailed_explanation ?? "",
    },

    comparison: Array.isArray(raw.comparison) ? raw.comparison : [],

    common_mistakes: Array.isArray(raw.common_mistakes)
      ? raw.common_mistakes
      : [],

    practice_questions: Array.isArray(raw.practice_questions)
      ? raw.practice_questions
      : [],

    unlock_condition: raw.unlock_condition ?? "",
  };
}

export async function getOrCreateDay(dayNumber) {
  const existing = await DayContent.findOne({ day: dayNumber });
  if (existing) return existing;

  const userPayload = {
    day: 1,
    title: "Names, Not Boxes: Variables and Binding",
    focus:
      "Explain how Python variables are names bound to objects, contrasting with C++ static typing and memory ownership.",
    schema: "DayContentSchema_v1",
  };

  // ✅ raw is ALREADY an object
  const raw = await generateDayContent(SYSTEM_PROMPT, userPayload);

  if (!raw) {
    throw new Error("AI returned empty response");
  }

  // 🔑 THIS WAS MISSING
  const normalized = normalizeDayContent(raw);

  // 🔐 ZOD FINAL GATE
  const validated = DayContentSchema.parse(normalized);

  const saved = await DayContent.create(validated);
  return saved;
}
