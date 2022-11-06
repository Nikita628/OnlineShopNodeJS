import express from "express";
import { requireAuthentication } from "../middleware/require-authentication";
import { cartService, paginationMapper } from "../services";
import { orderService } from "../services";
import { productService } from "../services";
import fs from "fs";
import path from "path";
import { isAuthorizedToReadOrder } from "../middleware/order-read-authorization";

const shopRouter = express.Router();

shopRouter.get("/", async (req, res, next) => {
  const pagination = paginationMapper.toModel(req.query);

  res.render("shop/index", {
    pageTitle: "Shop",
    page: await productService.getProducts(pagination),
    pagination,
  });
});

shopRouter.get("/product-list", async (req, res, next) => {
  const pagination = paginationMapper.toModel(req.query);

  res.render("shop/product-list", {
    pageTitle: "Product List",
    page: await productService.getProducts(pagination),
    pagination,
  });
});

shopRouter.get("/product-details/:id", async (req, res, next) => {
  res.render("shop/product-details", {
    pageTitle: "Product Details",
    product: await productService.getProduct(req.params.id),
  });
});

shopRouter.get("/checkout", requireAuthentication, (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
  });
});

shopRouter.get("/cart", requireAuthentication, async (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    cart: await cartService.getCart(req.session.authenticatedUserId!),
  });
});

shopRouter.post("/cart", requireAuthentication, async (req, res, next) => {
  const productId: string = req.body.productId;
  await cartService.addProductToCart(
    req.session.authenticatedUserId!,
    productId
  );
  res.redirect("/cart");
});

shopRouter.post(
  "/delete-from-cart",
  requireAuthentication,
  async (req, res, next) => {
    const productId: string = req.body.productId;
    await cartService.deleteProductFromCart(
      req.session.authenticatedUserId!,
      productId
    );
    res.redirect("/cart");
  }
);

shopRouter.get("/orders", requireAuthentication, async (req, res, next) => {
  const orders = await orderService.getOrders(req.session.authenticatedUserId!);

  res.render("shop/orders", {
    pageTitle: "Orders",
    orders,
  });
});

shopRouter.post("/order", requireAuthentication, async (req, res, next) => {
  await orderService.order(req.session.authenticatedUserId!);

  res.redirect("/orders");
});

shopRouter.get(
  "/invoice/:orderId",
  requireAuthentication,
  isAuthorizedToReadOrder,
  async (req, res, next) => {
    const orderId = req.params.orderId;
    const invoiceName = `${orderId}.pdf`;

    const stream = fs.createReadStream(
      path.join("files", "invoices", invoiceName)
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${invoiceName}.pdf"`
    );

    stream.pipe(res);
  }
);

export { shopRouter };
