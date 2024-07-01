import jsonwebtoken from "jsonwebtoken";
import fs from "fs";
console.log()
const privateKey = fs.readFileSync(`${process.cwd()}/rsa_key.pem`, "utf8");

function issueToken(userID) {
  const expiresIn = "3d";

  const payload = {
    sub: userID,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, privateKey, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expiresAt: new Date(Date.now() + 3 * 24 * 3600 * 1000),
  };
}

export default {
    issueToken
}