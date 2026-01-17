import { getOrCreateDay } from "../services/day.service.js";

export async function getDay(req, res) {
  const dayNumber = Number(req.params.day);

  // TEMP user until auth
  const userId = "000000000000000000000002";

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
