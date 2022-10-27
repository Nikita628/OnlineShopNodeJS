import { NextFunction, Request, Response } from "express";

export function errorHandling(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("error handling: ", error);
  return res.render("error", { error, pageTitle: "Error" });
}
