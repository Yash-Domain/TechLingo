import User from "../models/User.model.js";
import { hashPassword, encrypt } from "../utils/crypto.js";

export async function getSettings(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Get settings error:", err);
    res.status(500).json({ message: "Failed to load settings" });
  }
}

export async function updateSettings(req, res) {
  try {
    const userId = req.user.id;
    const { openrouterApiKey, model, password } = req.body;

    const update = {};

    // Update API key
    if (openrouterApiKey !== undefined) {
      update["openrouter.apiKeyEncrypted"] = encrypt(openrouterApiKey);
    }

    // Update model
    if (model !== undefined) {
      update["openrouter.model"] = model;
    }

    // Update password
    if (password) {
      update.passwordHash = await hashPassword(password);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: update },
      { new: true }
    ).select("-passwordHash");

    res.json({
      message: "Settings updated successfully",
      user,
    });
  } catch (err) {
    console.error("Settings update error:", err);
    res.status(500).json({ message: "Failed to update settings" });
  }
}
