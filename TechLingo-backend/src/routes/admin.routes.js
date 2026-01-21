import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
const router = Router();

// placeholder route (safe)
router.get("/health",auth, (req, res) => {
  res.json({ status: "admin ok" });
});

export default router;
