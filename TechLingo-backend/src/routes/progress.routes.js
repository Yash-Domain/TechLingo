import { Router } from "express";

const router = Router();

// placeholder route
router.post("/complete", (req, res) => {
  res.json({ status: "progress routes ok" });
});

export default router;
