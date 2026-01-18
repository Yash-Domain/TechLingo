import { getOrCreateDay } from "../services/day.service.js";

export async function getDay(req, res) {
  const dayNumber = Number(req.params.day);

  
  const userId = req.header("x-user-id");
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  if (dayNumber < 1 || dayNumber > 7) {
    return res.status(404).json({ message: "Invalid day" });
  }

  try {
    const data = await getOrCreateDay(userId, dayNumber);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
