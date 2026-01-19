import express from "express";
import { completeDay } from "../controllers/progress.controller.js";

const router = express.Router();

router.post("/complete", completeDay);
router.get("/", getProgress);

export default router;
