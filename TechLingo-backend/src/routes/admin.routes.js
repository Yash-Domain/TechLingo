import { Router } from "express";

const router = Router();

// placeholder route (safe)
router.get("/health", (req, res) => {
  res.json({ status: "admin ok" });
});

export default router;
