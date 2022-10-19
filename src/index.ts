import bodyParser from "body-parser";
import express from "express";
import path from "path";
import session from "express-session";
import { adminRouter } from "./routes/admin";
import { shopRouter } from "./routes/shop";
import { seedSqlDb } from "./database/sql/sql-seed";
import { config } from "./config";
import { connectMongo } from "./database/nosql/nosql";
import { seedNoSqlDb } from "./database/nosql/nosql-seed";
import { authRouter } from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import csrf from "csurf";
import { utilsRouter } from "./routes/utils";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import { localsMiddleware } from "./middleware/locals";
import { errorHandlingMiddleware } from "./middleware/error-handling";

declare module "express-session" {
  interface SessionData {
    isAuthenticated?: boolean;
    isDark?: boolean;
  }
}

(async function () {
  if (config.db === "sql") {
    seedSqlDb();
  } else if (config.db === "nosql") {
    await connectMongo();
    await seedNoSqlDb();
  }
})();

const app = express();
const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// adding middleware -------------------------------------
app.use(errorHandlingMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "test secret should be in config long value",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(csrfProtection);
app.use(flash());
app.use(localsMiddleware);

// routes -----------------------------------------
app.use("/admin", authMiddleware, adminRouter);
app.use(shopRouter);
app.use(authRouter);
app.use(utilsRouter);
app.use((req, res, next) => {
  res.status(404).render("not-found", {
    pageTitle: "Page Not Found",
    isAuthenticated: req.session.isAuthenticated,
  });
});

app.listen(3000);
