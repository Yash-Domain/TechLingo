console.log("✅ Debug routes mounted");

import express from "express";
import cors from "cors";

// route imports
import dayRoutes from "./routes/day.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import settingsRoutes from "./routes/settings.routes.js";


const app = express();

/* =======================
   CORS CONFIG (CRITICAL)
   ======================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tech-lingo.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


// 👇 THIS LINE IS REQUIRED FOR PREFLIGHT
app.options("*", cors());

/* =======================
   MIDDLEWARE
   ======================= */
app.use(express.json());

/* =======================
   HEALTH CHECK
   ======================= */
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "TechLingo API running" });
});

/* =======================
   ROUTES
   ======================= */
app.use("/api/auth", authRoutes);
app.use("/api/day", dayRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/settings", settingsRoutes);


export default app;
