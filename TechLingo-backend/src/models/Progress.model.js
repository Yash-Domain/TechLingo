import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true,
    },

    completedDays: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Progress", ProgressSchema);
