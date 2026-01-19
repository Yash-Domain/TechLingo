import Progress from "../models/Progress.model.js";

export async function completeDay(req, res) {
  const userId = req.header("x-user-id");
  const { day } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  if (!day || day < 1 || day > 7) {
    return res.status(400).json({ message: "Invalid day" });
  }

  const progress = await Progress.findOneAndUpdate(
    { userId },
    { $addToSet: { completedDays: day } }, // prevents duplicates
    { upsert: true, new: true }
  );

  res.json({
    message: `Day ${day} marked as completed`,
    completedDays: progress.completedDays,
  });
}
