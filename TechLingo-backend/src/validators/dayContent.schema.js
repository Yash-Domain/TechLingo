import { z } from "zod";

export const DayContentSchema = z.object({
  day: z.number().int().min(1).max(7),
  title: z.string(),

  core_concept: z.object({
    summary: z.string(),
    detailed_explanation: z.string(),
  }),

  comparison: z.array(
    z.object({
      concept: z.string(),
      cpp: z.string(),
      python: z.string(),
      mental_model: z.string(),
    })
  ),

  common_mistakes: z.array(z.string()),

  practice_questions: z.array(
    z.object({
      question: z.string(),
      expected_thinking: z.string(),
    })
  ),

  unlock_condition: z.string(),
});
