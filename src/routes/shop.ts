import express from "express";
import { authMiddleware } from "../middleware/auth";
import { cartService } from "../services";
import { orderService } from "../services";
import { productService } from "../services";
import { DEFAULT_USER_ID } from "../utils/constants";

const shopRouter = express.Router();

shopRouter.get("/", async (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Shop",
    products: await productService.getProducts({}),
  });
});

shopRouter.get("/product-list", async (req, res, next) => {
  res.render("shop/product-list", {
    pageTitle: "Product List",
    products: await productService.getProducts({}),
  });
});

shopRouter.get("/product-details/:id", async (req, res, next) => {
  res.render("shop/product-details", {
    pageTitle: "Product Details",
    product: await productService.getProduct(req.params.id),
  });
});

shopRouter.get("/checkout", authMiddleware, (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
  });
});

shopRouter.get("/cart", authMiddleware, async (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    cart: await cartService.getCart(DEFAULT_USER_ID),
  });
});

shopRouter.post("/cart", authMiddleware, async (req, res, next) => {
  const productId: string = req.body.productId;
  await cartService.addProductToCart(DEFAULT_USER_ID, productId);
  res.redirect("/cart");
});

shopRouter.post("/delete-from-cart", authMiddleware, async (req, res, next) => {
  const productId: string = req.body.productId;
  await cartService.deleteProductFromCart(DEFAULT_USER_ID, productId);
  res.redirect("/cart");
});

shopRouter.get("/orders", authMiddleware, async (req, res, next) => {
  const orders = await orderService.getOrders(DEFAULT_USER_ID);

  res.render("shop/orders", {
    pageTitle: "Orders",
    orders,
  });
});

shopRouter.post("/order", authMiddleware, async (req, res, next) => {
  await orderService.order(DEFAULT_USER_ID);
  await cartService.deleteCart(DEFAULT_USER_ID);

  res.redirect("/orders");
});

export { shopRouter };
