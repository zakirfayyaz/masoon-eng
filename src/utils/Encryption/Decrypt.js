import crypto from "crypto";
const algorithm = "aes-128-cbc";
// const secret = "MySecretKeyForEn";
const keystring = Buffer.from("MySecretKeyForEn");
const iv = Buffer.from("MySecretKeyForEn");
const inputEncoding = "utf8";
const outputEncoding = "base64";

function decrypt(encrypted) {
  let decipher = crypto.createDecipheriv(algorithm, keystring, iv);
  let dec = decipher.update(encrypted, outputEncoding, inputEncoding);
  dec += decipher.final(inputEncoding);
  return dec;
}

export default decrypt;
