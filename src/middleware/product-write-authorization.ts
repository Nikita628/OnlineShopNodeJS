import { NextFunction, Request, Response } from "express";
import { productService } from "../services";

export async function isAuthorizedToWriteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const product = await productService.getProduct(req.body.id);

  if (!product) {
    return res.render("not-found", { pageTitle: "Not Found" });
  } else if (product.userId !== req.session.authenticatedUserId) {
    return res.status(401).send("unauthorized");
  }

  next();
}
