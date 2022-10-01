import express from "express";
import { IProduct, productMapper } from "../models/product";
import { cartServiceInstance } from "../services/cart-service";
import { productServiceInstance } from "../services/product-service";

const adminRouter = express.Router();

adminRouter.get("/create-product", (req, res, next) => {
  res.render("admin/create-product", { pageTitle: "Create Product" });
});

adminRouter.post("/create-product", (req, res, next) => {
  const product: IProduct = productMapper.toModel(req.body);
  productServiceInstance.createProduct(product);
  res.redirect("/admin/product-list");
});

adminRouter.get("/product-list", (req, res, next) => {
  res.render("admin/admin-product-list", {
    pageTitle: "Admin Products",
    products: productServiceInstance.getProducts(),
  });
});

adminRouter.get("/edit-product/:productId", (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    product: productServiceInstance.getProduct(req.params.productId),
  })
});

adminRouter.post("/edit-product", (req, res, next) => {
  const product: IProduct = productMapper.toModel(req.body);
  productServiceInstance.updateProduct(product);
  res.redirect("/admin/product-list");
});

adminRouter.post("/delete-product", (req, res, next) => {
  productServiceInstance.deleteProduct(req.body.productId);
  cartServiceInstance.deleteFromCart(req.body.productId);
  res.redirect("/admin/product-list");
});

export { adminRouter };
