import Progress from "../models/Progress.model.js";

/**
 * Ensure a progress document exists for the user
 */
export async function getOrCreateProgress(userId) {
  let progress = await Progress.findOne({ userId });

  if (!progress) {
    progress = await Progress.create({
      userId,
      completedDays: [],
    });
  }

  return progress;
}

/**
 * Check if user can access a given day
 */
export async function canAccessDay(userId, day) {
  // Day 1 is always accessible
  if (day === 1) return true;

  const progress = await getOrCreateProgress(userId);

  return progress.completedDays.includes(day - 1);
}
