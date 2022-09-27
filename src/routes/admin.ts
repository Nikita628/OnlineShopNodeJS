import express from "express";
import { viewsPath } from "../utils/path";

const adminRouter = express.Router();

adminRouter.get("/add-product", (req, res, next) => {
  res.sendFile(viewsPath('add-product.html'));
});

adminRouter.post("/add-product", (req, res, next) => {
  res.redirect("/");
});

export { adminRouter };
