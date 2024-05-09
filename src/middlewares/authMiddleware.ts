import asyncHandler from "./asyncHandler";
import prisma from "../utils/db";
import { verifyJwt } from "../utils/auth";

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
    const { userId } = verifyJwt(token);
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
