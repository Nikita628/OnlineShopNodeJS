import express from "express";
import { authMapper } from "../models/auth";
import { authService } from "../services";

const authRouter = express.Router();

authRouter.get("/login", (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
  });
});

authRouter.post("/login", async (req, res, next) => {
  const loginData = authMapper.toLoginData(req.body);
  const loginResult = await authService.login(loginData);

  if (loginResult.value) {
    req.session.isAuthenticated = true;
    req.session.save();
    res.redirect("/product-list");
  } else if (loginResult.error) {
    req.flash("error", loginResult.error.toJson());
    res.redirect("/login");
  }
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
    res.redirect("/login");
  } else if (signupResult.error) {
    req.flash("error", signupResult.error.toJson());
    res.redirect("/signup");
  }
});

authRouter.post("/logout", async (req, res, next) => {
  req.session.destroy(() => {});
  res.redirect("/product-list");
});

export { authRouter };
