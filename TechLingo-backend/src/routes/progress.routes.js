import express from "express";
import { completeDay, getProgress } from "../controllers/progress.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/complete", auth, completeDay);
router.get("/",auth, getProgress);

export default router;
