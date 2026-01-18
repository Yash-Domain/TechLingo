import crypto from "crypto";
import bcrypt from "bcryptjs";

function getEncryptionKey() {
  const secret = process.env.ENCRYPTION_SECRET;

  if (!secret) {
    throw new Error("ENCRYPTION_SECRET is not set");
  }

  return Buffer.from(secret, "hex");
}

// 🔒 Password hashing
export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// 🔐 API key encryption
export function encrypt(text) {
  if (!text) {
    throw new Error("Nothing to encrypt");
  }

  const iv = crypto.randomBytes(16);
  const key = getEncryptionKey();

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(encryptedText) {
  const [ivHex, encrypted] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const key = getEncryptionKey();

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
