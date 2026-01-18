import User from "../models/User.model.js";
import {
  hashPassword,
  verifyPassword,
  encrypt,
} from "../utils/crypto.js";

// ---------------- SIGNUP ----------------
export async function signup(req, res) {
  const { username, password, openrouterApiKey, model } = req.body;

  if (!username || !password || !openrouterApiKey || !model) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const passwordHash = await hashPassword(password);
  const apiKeyEncrypted = encrypt(openrouterApiKey);

  const user = await User.create({
    username,
    passwordHash,
    openrouter: {
      apiKeyEncrypted,
      model,
    },
  });

  res.status(201).json({
    message: "User created",
    userId: user._id,
  });
}

// ---------------- LOGIN ----------------
export async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    userId: user._id,
  });
}
