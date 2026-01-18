import User from "../models/User.model.js";
import { hashPassword, encrypt } from "../utils/crypto.js";

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
