import { NextFunction, Request, Response } from "express";
import { Error } from "../models/utils/error";

export function localsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.isAuthenticated = req.session?.isAuthenticated;
  res.locals.token = req.csrfToken();
  res.locals.theme = req.cookies?.theme;
  const errorAsJson = req.flash("error")[0];
  res.locals.error = errorAsJson ? Error.fromJson(errorAsJson) : undefined;

  next();
}
