import config from "./../config/config"

import jwt, { type Secret } from "jsonwebtoken"

const JWT_SECRET: Secret | undefined = config.JWT_SECRET
const JWT_EXPIRES_IN: string = config.JWT_EXPIRES_IN || "1d"

// Ensure JWT_SECRET is defined
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.")
}
export type TJWTPayload = {
  _id: string
  email: string
  role: "customer" | "admin"
}
export const generateToken = (jwtPayload: TJWTPayload): string => {
  return jwt.sign(jwtPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions) // Explicitly casting to SignOptions
}

