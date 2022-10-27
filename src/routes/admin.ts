import express from "express";
import { isAuthorizedToReadProduct } from "../middleware/product-read-authorization";
import { isAuthorizedToWriteProduct } from "../middleware/product-write-authorization";
import { IProduct } from "../models/product";
import { cartService, productMapper } from "../services";
import { productService } from "../services";

const adminRouter = express.Router();

adminRouter.get("/create-product", (req, res, next) => {
  res.render("admin/create-product", {
    pageTitle: "Create Product",
    product: null,
  });
});

adminRouter.post("/create-product", async (req, res, next) => {
  const product = productMapper.toModelForCreate({
    ...req.body,
    userId: req.session.authenticatedUserId,
  });

  const createResult = await productService.createProduct(product);

  if (createResult.error) {
    return res.render("admin/create-product", {
      pageTitle: "Create Product",
      product,
      error: createResult.error,
    });
  }

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

adminRouter.get(
  "/edit-product/:productId",
  isAuthorizedToReadProduct,
  async (req, res, next) => {
    const product = await productService.getProduct(req.params.productId);

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      product,
    });
  }
);

adminRouter.post(
  "/edit-product",
  isAuthorizedToWriteProduct,
  async (req, res, next) => {
    const product: IProduct = productMapper.toModel({
      ...req.body,
      userId: req.session.authenticatedUserId,
    });

    const updateResult = await productService.updateProduct(product);

    if (updateResult.error) {
      return res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        product,
        error: updateResult.error,
      });
    }

    res.redirect("/admin/product-list");
  }
);

adminRouter.post(
  "/delete-product",
  isAuthorizedToWriteProduct,
  async (req, res, next) => {
    await cartService.deleteProductFromCart(
      req.session.authenticatedUserId!,
      req.body.productId
    );

    await productService.deleteProduct(req.body.productId);

    res.redirect("/admin/product-list");
  }
);

export { adminRouter };
