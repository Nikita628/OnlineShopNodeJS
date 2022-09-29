import express from "express";
import { IProduct, productMapper } from "../models/product";
import { productServiceInstance } from "../services/product-service";

const adminRouter = express.Router();

adminRouter.get("/create-product", (req, res, next) => {
  res.render("admin/create-product", { pageTitle: "Create Product" });
});

adminRouter.post("/create-product", (req, res, next) => {
  const product: IProduct = productMapper.toModel(req.body);
  productServiceInstance.addProduct(product);
  res.redirect("/");
});

adminRouter.get("/product-list", (req, res, next) => {
  res.render("admin/admin-product-list", {
    pageTitle: "Admin Products",
    products: productServiceInstance.getProducts(),
  });
});

export { adminRouter };
