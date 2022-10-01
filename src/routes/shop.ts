import express from "express";
import { cartServiceInstance } from "../services/cart-service";
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

shopRouter.get("/product-details/:id", (req, res, next) => {
  res.render("shop/product-details", {
    pageTitle: "Product Details",
    product: productServiceInstance.getProduct(req.params.id),
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
    cart: cartServiceInstance.getCart(''),
  });
});

shopRouter.post("/cart", (req, res, next) => {
  const productId: string = req.body.productId;
  cartServiceInstance.addToCart(productId);
  res.redirect('/cart');
});

shopRouter.post("/delete-from-cart", (req, res, next) => {
  const productId: string = req.body.productId;
  cartServiceInstance.deleteProductFromCart(productId);
  res.redirect('/cart');
});

shopRouter.get("/orders", (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
  });
});

export { shopRouter };
