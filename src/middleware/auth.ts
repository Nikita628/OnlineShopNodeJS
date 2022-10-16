import { NextFunction, Request, Response } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.isAuthenticated) {
    return res.redirect("/login");
  }

  next();
}
