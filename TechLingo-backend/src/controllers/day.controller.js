import { getOrCreateDay } from "../services/day.service.js";

export async function getDay(req, res) {
  const dayNumber = Number(req.params.day);

  if (dayNumber !== 1) {
    return res.status(404).json({ message: "Only Day 1 available" });
  }

  try {
    const data = await getOrCreateDay(dayNumber);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
