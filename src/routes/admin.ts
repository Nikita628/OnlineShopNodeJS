import express from "express";
import { IProduct } from "../models/product";
import { instance as productService } from '../services/productService';

const adminRouter = express.Router();

adminRouter.get("/add-product", (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product' });
});

adminRouter.post("/add-product", (req, res, next) => {
  const product: IProduct = req.body;
  productService.addProduct(product);
  res.redirect("/");
});

export { adminRouter };
