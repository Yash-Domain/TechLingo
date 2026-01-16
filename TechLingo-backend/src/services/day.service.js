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

  const raw = await generateDayContent(SYSTEM_PROMPT, userPayload);

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("AI did not return valid JSON");
  }

  const validated = DayContentSchema.parse(parsed);

  const saved = await DayContent.create(validated);
  return saved;
}
