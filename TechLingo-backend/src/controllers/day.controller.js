import { getOrCreateDay } from "../services/day.service.js";
import { canAccessDay } from "../services/progress.service.js";

export async function getDay(req, res) {
  const dayNumber = Number(req.params.day);

  const userId = req.user.id;

  if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 7) {
    return res.status(404).json({ message: "Invalid day" });
  }

  try {
    // 🔒 PROGRESSION CHECK (NEW)
    const allowed = await canAccessDay(userId, dayNumber);
    if (!allowed) {
      return res.status(403).json({
        message: "Complete previous day to unlock this lesson",
      });
    }

    const data = await getOrCreateDay(userId, dayNumber);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
