import mongoose, { Schema } from "mongoose";
import { IProductNoSqlDbModel } from "../../contracts/product";

const schema = new Schema<IProductNoSqlDbModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
});

export const ProductModel = mongoose.model("Product", schema);

 
 