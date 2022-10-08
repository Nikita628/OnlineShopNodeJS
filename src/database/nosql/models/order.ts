import mongoose, { Schema } from "mongoose";
import { IOrderNoSqlDbModel } from "../../contracts/order";

const schema = new Schema<IOrderNoSqlDbModel>({
  user: {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  orderItems: [
    {
      quantity: { type: Number, required: true },
      product: { type: Object, required: true },
    },
  ],
});

export const OrderModel = mongoose.model<IOrderNoSqlDbModel>("Order", schema);
