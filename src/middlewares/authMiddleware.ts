import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import prisma from "../utils/db";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || "";

    const { userId } = jwt.verify(token, jwtSecret) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid token");
  }
});

export default authMiddleware;
