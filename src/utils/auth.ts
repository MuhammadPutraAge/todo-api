import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface JwtPayload extends jwt.JwtPayload {
  userId: string;
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const compareHashPassword = (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
};

export const generateToken = (userId: string) => {
  const jwtSecret = process.env.JWT_SECRET || "";

  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: 15 * 60, // 15 minutes
  });

  return token;
};

export const verifyJwt = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET || "";

  return jwt.verify(token, jwtSecret) as JwtPayload;
};
