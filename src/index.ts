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
import { requireAuthentication } from "./middleware/require-authentication";
import csrf from "csurf";
import { utilsRouter } from "./routes/utils";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import { setResponseLocals } from "./middleware/locals";
import { errorHandling } from "./middleware/error-handling";
import { fileStorage } from "./middleware/file-storage";

declare module "express-session" {
  interface SessionData {
    isDark?: boolean;
    authenticatedUserId?: string;
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
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileStorage('images', 'image'));
app.use(express.static(path.join(__dirname, "public")));
app.use('/files/images', express.static(path.join('files', 'images')));
app.use(
  session({
    secret: "test secret should be in config long value",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(csrfProtection);
app.use(flash());
app.use(setResponseLocals);

// routes -----------------------------------------
app.use("/admin", requireAuthentication, adminRouter);
app.use(shopRouter);
app.use(authRouter);
app.use(utilsRouter);
app.use((req, res, next) => {
  res.status(404).render("not-found", {
    pageTitle: "Page Not Found",
    isAuthenticated: !!req.session?.authenticatedUserId,
  });
});

// error handling middleware should be the last one to add
app.use(errorHandling);

app.listen(3000);
