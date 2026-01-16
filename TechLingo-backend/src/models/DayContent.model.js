import mongoose from "mongoose";

const DayContentSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true, unique: true },
    title: { type: String, required: true },

    core_concept: {
      summary: { type: String, required: true },
      detailed_explanation: { type: String, required: true },
    },

    comparison: [
      {
        concept: { type: String, required: true },
        cpp: { type: String, required: true },
        python: { type: String, required: true },
        mental_model: { type: String, required: true },
      },
    ],

    common_mistakes: {
      type: [String],
      required: true,
    },

    practice_questions: [
      {
        question: { type: String, required: true },
        expected_thinking: { type: String, required: true },
      },
    ],

    unlock_condition: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("DayContent", DayContentSchema);
