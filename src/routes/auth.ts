import express from "express";
import { authMapper, authService, userService } from "../services";

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
    req.session.authenticatedUserId = loginResult.value.id;
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
  res.redirect("/");
});

authRouter.get("/reset", async (req, res, next) => {
  res.render("auth/password-reset", {
    pageTitle: "Reset",
  });
});

authRouter.post("/reset", async (req, res, next) => {
  const result = await authService.resetPassword(req.body.email);

  if (result.value) {
    res.redirect("/login");
  } else if (result.error) {
    req.flash("error", result.error.toJson());
    res.redirect("/reset");
  }
});

authRouter.get("/new-password/:token", async (req, res, next) => {
  const result = await userService.validateResetToken(req.params.token);

  if (result.value) {
    res.render("auth/new-password", {
      pageTitle: "New Password",
      userId: result.value.id.toString(),
    });
  } else if (result.error) {
    req.flash("error", result.error.toJson());
    res.redirect("/reset");
  }
});

authRouter.post("/new-password", async (req, res, next) => {
  await userService.setNewPassword(req.body.userId, req.body.password);

  res.redirect("/login");
});

export { authRouter };
