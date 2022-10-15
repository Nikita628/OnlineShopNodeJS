import express from "express";
import { authMapper } from "../models/auth";
import { authService } from "../services";

const authRouter = express.Router();

authRouter.get("/login", (req, res, next) => {
  res.render("auth/login", { pageTitle: "Login" });
});

authRouter.post("/login", async (req, res, next) => {
  const loginData = authMapper.toLoginData(req.body);
  const loginResult = await authService.login(loginData);

  if (loginResult.value) {
    req.session.isAuthenticated = true;
  } else {
    // redirect to error page
  }

  res.redirect("/product-list");
});

authRouter.get("/signup", async (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
  });
});

authRouter.post("/signup", async (req, res, next) => {
  const signupData = authMapper.toSignupData(req.body);
  const signupResult = await authService.signup(signupData);

  if (signupResult.value) {
    req.session.isAuthenticated = true;
  } else {
    // redirect to error page
  }

  res.redirect("/product-list");
});

authRouter.post("/logout", async (req, res, next) => {
  req.session.isAuthenticated = false;
  res.redirect("/product-list");
});

export { authRouter };