import mongoose, { Schema } from "mongoose";
import { IUserNoSqlDbModel } from "../../contracts/user";

const schema = new Schema<IUserNoSqlDbModel>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiration: Number,
  cart: {
    cartItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

export const UserModel = mongoose.model<IUserNoSqlDbModel>("User", schema);
