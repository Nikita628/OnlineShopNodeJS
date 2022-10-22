import express from "express";
import { IProduct } from "../models/product";
import { cartService, productMapper } from "../services";
import { productService } from "../services";

const adminRouter = express.Router();

adminRouter.get("/create-product", (req, res, next) => {
  res.render("admin/create-product", {
    pageTitle: "Create Product",
  });
});

adminRouter.post("/create-product", async (req, res, next) => {
  const product = productMapper.toModelForCreate({
    ...req.body,
    userId: req.session.authenticatedUserId,
  });

  await productService.createProduct(product);

  res.redirect("/admin/product-list");
});

adminRouter.get("/product-list", async (req, res, next) => {
  res.render("admin/admin-product-list", {
    pageTitle: "Admin Products",
    products: await productService.getProducts({
      userId: req.session.authenticatedUserId,
    }),
  });
});

adminRouter.get("/edit-product/:productId", async (req, res, next) => {
  const product = await productService.getProduct(req.params.productId);

  if (!product) {
    return res.render("/not-found", { pageTitle: "Not Found" });
  } else if (product.userId !== req.session.authenticatedUserId) {
    return res.status(401).send("unauthorized");
  }

  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    product,
  });
});

adminRouter.post("/edit-product", async (req, res, next) => {
  const product: IProduct = productMapper.toModel({
    ...req.body,
    userId: req.session.authenticatedUserId,
  });

  const existingProduct = await productService.getProduct(product.id);

  if (!existingProduct) {
    return res.render("/not-found", { pageTitle: "Not Found" });
  } else if (existingProduct.userId !== req.session.authenticatedUserId) {
    return res.status(401).send("unauthorized");
  }

  await productService.updateProduct(product);

  res.redirect("/admin/product-list");
});

adminRouter.post("/delete-product", async (req, res, next) => {
  const existingProduct = await productService.getProduct(req.body.productId);

  if (!existingProduct) {
    return res.render("/not-found", { pageTitle: "Not Found" });
  } else if (existingProduct.userId !== req.session.authenticatedUserId) {
    return res.status(401).send("unauthorized");
  }

  await cartService.deleteProductFromCart(
    req.session.authenticatedUserId!,
    req.body.productId
  );

  await productService.deleteProduct(req.body.productId);

  res.redirect("/admin/product-list");
});

export { adminRouter };
