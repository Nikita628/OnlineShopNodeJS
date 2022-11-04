import { NextFunction, Request, Response } from "express";

export function errorHandling(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("error handling: ", error);

  res.locals.isAuthenticated = !!req.session?.authenticatedUserId;
  res.locals.token = '';
  res.locals.theme = req.cookies?.theme;
  
  return res.render("error", {
    error,
    pageTitle: "Error",
  });
}
