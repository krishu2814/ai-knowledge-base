import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: env.EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}
