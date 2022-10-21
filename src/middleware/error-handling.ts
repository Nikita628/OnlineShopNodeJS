import { NextFunction, Request, Response } from "express";

export function errorHandling(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    next();
  } catch (error) {
    console.log("--- error info start ---");
    console.log(error);
    console.log("--- error info end ---");
    res.send(error);
  }
}
