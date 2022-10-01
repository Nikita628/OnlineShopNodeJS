import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { adminRouter } from "./routes/admin";
import { shopRouter } from "./routes/shop";
import { dbPool } from "./database/sql";
import { seed } from "./database/sql-seed";

(async function() {
  await seed();
})();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // console.log("req log: ", req.path, req.method);
  next();
});

app.use("/admin", adminRouter);
app.use(shopRouter);
app.use((req, res, next) => {
  res.status(404).render("not-found", { pageTitle: "Page Not Found" });
});

app.listen(3000);
