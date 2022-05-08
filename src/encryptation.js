const crypto = require("crypto");
require("dotenv").config();

const algorithm = "aes-256-cbc";
const key = process.env.AES_KEY;
const iv = process.env.AES_IV;

const encryptData = (data) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encryptedData = cipher.update(data, "utf-8", "hex");

  return encryptedData + cipher.final("hex");
};

const decryptData = (encryptedData) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decryptedData = decipher.update(encryptedData, "hex", "utf-8");

  return decryptedData + decipher.final("utf8");
};

module.exports = { decryptData, encryptData };
