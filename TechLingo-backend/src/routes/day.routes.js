import { Router } from "express";
import { getDay } from "../controllers/day.controller.js";

const router = Router();

router.get("/:day", getDay);

export default router;

