import express from "express";
import { isAuthorizedToAccessProduct } from "../middleware/product-edit-authorization";
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

adminRouter.get(
  "/edit-product/:productId",
  isAuthorizedToAccessProduct,
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
  isAuthorizedToAccessProduct,
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
  isAuthorizedToAccessProduct,
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
