import { Router } from "express";
import { getDay } from "../controllers/day.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = Router();

router.get("/:day", auth, getDay);

export default router;

