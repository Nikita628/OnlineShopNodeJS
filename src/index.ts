import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { adminRouter } from "./routes/admin";
import { shopRouter } from "./routes/shop";
import { viewsPath } from "./utils/path";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  // console.log("req log: ", req.path, req.method);
  next();
});

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use((req, res, next) => {
  res.status(404).sendFile(viewsPath('not-found.html'));
});



app.listen(3000);
