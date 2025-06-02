import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

export const generateToken = (userId: string, remember: boolean = false) => {
  const token = jwt.sign({ userId }, config.jwt.jwt_secret as Secret, {
    expiresIn: remember
      ? (config.jwt.expires_remember as any)
      : (config.jwt.expires_default as any),
  });

  return token;
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, config.jwt.jwt_secret as Secret);
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
