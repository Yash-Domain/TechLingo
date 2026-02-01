import express from "express";
import auth from "../middleware/auth.middleware.js";
import { updateSettings } from "../controllers/settings.controller.js";

const router = express.Router();

router.put("/", auth, updateSettings);

export default router;
