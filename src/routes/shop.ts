import express from "express";
import { productServiceInstance } from "../services/product-service";

const shopRouter = express.Router();

shopRouter.get("/", (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Shop",
    products: productServiceInstance.getProducts(),
  });
});

shopRouter.get("/product-list", (req, res, next) => {
  res.render("shop/product-list", {
    pageTitle: "Product List",
    products: productServiceInstance.getProducts(),
  });
});

shopRouter.get("/checkout", (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
  });
});

shopRouter.get("/cart", (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
  });
});

shopRouter.get("/orders", (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
  });
});

export { shopRouter };