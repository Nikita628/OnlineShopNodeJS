import { NextFunction, Request, Response } from "express";

export function requireAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.authenticatedUserId) {
    return res.redirect("/login");
  }

  next();
}
