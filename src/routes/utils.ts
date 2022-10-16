import express from "express";

const utilsRouter = express.Router();

utilsRouter.post("/toggle-theme", async (req, res, next) => {
  res.cookie('theme', req.body.theme);
  res.send();
});

export { utilsRouter };
