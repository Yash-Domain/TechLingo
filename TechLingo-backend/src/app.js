console.log("✅ Debug routes mounted");

import express from "express";

// route imports
import dayRoutes from "./routes/day.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";


const app = express();

// middleware
app.use(express.json());

// health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "TechLingo API running" });
});

import debugRoutes from "./routes/debug.routes.js";

// routes
app.use("/api/day", dayRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/debug", debugRoutes);
app.use("/api/auth", authRoutes);


export default app;
