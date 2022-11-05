import { NextFunction, Request, Response } from "express";
import { OrderModel } from "../database/nosql/models/order";

export async function isAuthorizedToReadOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const order = await OrderModel.findById(req.params.orderId);

  if (!order) {
    return res.render("not-found", { pageTitle: "Not Found" });
  } else if (order.user.userId.toString() !== req.session.authenticatedUserId) {
    return res.status(401).send("unauthorized");
  }

  next();
}
