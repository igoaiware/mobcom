const NodeRSA = require("node-rsa");
const crypto = require("crypto");
const path = require("path");
const { writeFileSync, readFileSync } = require("fs");

class RsaEncript {
  static encrypt(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    const publicKey = readFileSync(absolutePath, "utf8");
    const buffer = Buffer.from(toEncrypt, "utf8");
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    // console.log(encrypted);
    return encrypted.toString("base64");
  }

  static decrypt(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    const absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    const privateKey = readFileSync(absolutePath, "utf8");
    const buffer = Buffer.from(toDecrypt, "base64");
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey.toString(),
        passphrase: ""
      },
      buffer
    );

    return decrypted.toString("utf8");
  }

  static generateKey() {
    const key = new NodeRSA({
      b: 512
    });
    key.generateKeyPair(2048, 65537);
    const publicKey = key.exportKey("pkcs8-public-pem");
    const privateKey = key.exportKey("pkcs8-private-pem");

    writeFileSync(".private.pem", privateKey);
    writeFileSync(".public.pem", publicKey);
  }
}

module.exports = { RsaEncript };

// const enc = encrypt(texto, "public.pem");
// const dec = decrypt(enc, "private.pem");
