export function decrypt(encryptedText) {
  if (!encryptedText || typeof encryptedText !== "string") {
    throw new Error("Encrypted API key is missing or invalid");
  }

  const parts = encryptedText.split(":");
  if (parts.length !== 2) {
    throw new Error("Malformed encrypted API key");
  }

  const [ivHex, encrypted] = parts;

  const iv = Buffer.from(ivHex, "hex");
  const key = getEncryptionKey();

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
