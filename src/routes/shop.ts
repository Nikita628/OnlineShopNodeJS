import express from "express";
import { viewsPath } from "../utils/path";

const shopRouter = express.Router();

shopRouter.get("/", (req, res, next) => {
  res.sendFile(viewsPath('shop.html'));
});

export { shopRouter };
