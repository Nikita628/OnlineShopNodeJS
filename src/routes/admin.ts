import express from "express";
import { executeSafely } from "../middleware/execute-safely";
import { isAuthorizedToReadProduct } from "../middleware/product-read-authorization";
import { isAuthorizedToWriteProduct } from "../middleware/product-write-authorization";
import { IProduct } from "../models/product";
import { cartService, paginationMapper, productMapper } from "../services";
import { productService } from "../services";

const adminRouter = express.Router();

adminRouter.get(
  "/create-product",
  executeSafely(async (req, res, next) => {
    res.render("admin/create-product", {
      pageTitle: "Create Product",
      product: null,
    });
  })
);

adminRouter.post(
  "/create-product",
  executeSafely(async (req, res, next) => {
    const product = productMapper.toModelForCreate({
      ...req.body,
      imageUrl: req.file?.path,
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
  })
);

adminRouter.get("/product-list", async (req, res, next) => {
  const pagination = paginationMapper.toModel(req.query);

  const productsPage = await productService.getProducts({
    userId: req.session.authenticatedUserId,
    ...pagination,
  });

  res.render("admin/admin-product-list", {
    pageTitle: "Admin Products",
    page: productsPage,
    pagination: pagination,
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
  executeSafely(async (req, res, next) => {
    const product: IProduct = productMapper.toModel({
      ...req.body,
      imageUrl: req.file?.path ?? req.body.imageUrl,
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
  })
);

adminRouter.post(
  "/delete-product",
  isAuthorizedToWriteProduct,
  executeSafely(async (req, res, next) => {
    await cartService.deleteProductFromCart(
      req.session.authenticatedUserId!,
      req.body.productId
    );

    await productService.deleteProduct(req.body.productId);

    res.redirect("/admin/product-list");
  })
);

export { adminRouter };
