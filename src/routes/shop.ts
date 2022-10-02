import express from "express";
import { cartServiceInstance } from "../services/cart-service";
import { productServiceInstance } from "../services/product-service";
import { DEFAULT_USER_ID } from "../utils/constants";

const shopRouter = express.Router();

shopRouter.get("/", async (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Shop",
    products: await productServiceInstance.getProducts({}),
  });
});

shopRouter.get("/product-list", async (req, res, next) => {
  res.render("shop/product-list", {
    pageTitle: "Product List",
    products: await productServiceInstance.getProducts({}),
  });
});

shopRouter.get("/product-details/:id", async (req, res, next) => {
  res.render("shop/product-details", {
    pageTitle: "Product Details",
    product: await productServiceInstance.getProduct(req.params.id),
  });
});

shopRouter.get("/checkout", (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
  });
});

shopRouter.get("/cart", async (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    cart: await cartServiceInstance.getCart(DEFAULT_USER_ID),
  });
});

shopRouter.post("/cart", async (req, res, next) => {
  const productId: string = req.body.productId;
  await cartServiceInstance.addToCart(DEFAULT_USER_ID, productId);
  res.redirect('/cart');
});

shopRouter.post("/delete-from-cart", async (req, res, next) => {
  const productId: string = req.body.productId;
  await cartServiceInstance.deleteFromCart(DEFAULT_USER_ID, productId);
  res.redirect('/cart');
});

shopRouter.get("/orders", (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
  });
});

export { shopRouter };
