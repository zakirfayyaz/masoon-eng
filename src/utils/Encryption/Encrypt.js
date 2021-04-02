import crypto from "crypto";
const algorithm = "aes-128-cbc";
// const secret = "MySecretKeyForEn";
const keystring = Buffer.from("MySecretKeyForEn");
const iv = Buffer.from("MySecretKeyForEn");
const inputEncoding = "utf8";
const outputEncoding = "base64";
function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, keystring, iv);
  let encrypted = cipher.update(text, inputEncoding, outputEncoding);
  encrypted += cipher.final(outputEncoding);
  return encrypted;
}

export default encrypt;
