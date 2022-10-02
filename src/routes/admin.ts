import express from "express";
import { IProduct, productMapper } from "../models/product";
import { cartServiceInstance } from "../services/cart-service";
import { productServiceInstance } from "../services/product-service";
import { DEFAULT_USER_ID } from "../utils/constants";

const adminRouter = express.Router();

adminRouter.get("/create-product", (req, res, next) => {
  res.render("admin/create-product", { pageTitle: "Create Product" });
});

adminRouter.post("/create-product", async (req, res, next) => {
  const product: IProduct = productMapper.toModel(req.body);
  await productServiceInstance.createProduct(product);
  res.redirect("/admin/product-list");
});

adminRouter.get("/product-list", async (req, res, next) => {
  res.render("admin/admin-product-list", {
    pageTitle: "Admin Products",
    products: await productServiceInstance.getProducts({}),
  });
});

adminRouter.get("/edit-product/:productId", async (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    product: await productServiceInstance.getProduct(req.params.productId),
  })
});

adminRouter.post("/edit-product", async (req, res, next) => {
  const product: IProduct = productMapper.toModel(req.body);
  await productServiceInstance.updateProduct(product);
  res.redirect("/admin/product-list");
});

adminRouter.post("/delete-product", async (req, res, next) => {
  await cartServiceInstance.deleteFromCart(DEFAULT_USER_ID, req.body.productId);
  await productServiceInstance.deleteProduct(req.body.productId);
  res.redirect("/admin/product-list");
});

export { adminRouter };
