import { NextFunction, Request, Response } from "express";

type fnType = (req: Request, res: Response, next: NextFunction) => void;

const asyncHandler =
  (fn: fnType) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;