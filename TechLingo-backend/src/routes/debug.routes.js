import express from "express";
import { generateDayContent } from "../services/ai.service.js";
import { SYSTEM_PROMPT } from "../utils/constants.js";

const router = express.Router();

router.post("/ai-raw", async (req, res) => {
  const userPayload = {
    day: 1,
    title: "Names, Not Boxes: Variables and Binding",
    focus:
      "Explain how Python variables are names bound to objects, contrasting with C++ static typing and memory ownership.",
    schema: "DayContentSchema_v1",
  };

  const raw = await generateDayContent(SYSTEM_PROMPT, userPayload);

  res.json({
    raw_ai_output: raw,
  });
});

export default router;
