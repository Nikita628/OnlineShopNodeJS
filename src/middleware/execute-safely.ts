import { NextFunction, Request, Response } from "express";

type middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export function executeSafely(func: middleware): middleware {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}
