import express from "express";
import { instance as productService } from '../services/productService';

const shopRouter = express.Router();

shopRouter.get("/", (req, res, next) => {
  res.render('shop', { pageTitle: 'Shop', products: productService.getProducts() });
});

export { shopRouter };
