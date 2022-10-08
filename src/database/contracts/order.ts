import { Types } from "mongoose";
import { IOrderItemNoSqlDbModel, IOrderItemSqlDbModel } from "./order-item";
import { IUserNoSqlDbModel, IUserSqlDbModel } from "./user";

export interface IOrderBaseDbModel {}

export interface IOrderSqlDbModel extends IOrderBaseDbModel {
  id: number;
  userId: number;
  user?: IUserSqlDbModel;
  orderItems?: IOrderItemSqlDbModel[];
}

export interface IOrderDbModelCreation
  extends Omit<IOrderSqlDbModel, "id" | "user" | "orderItems"> {}

export interface IOrderNoSqlDbModel extends IOrderBaseDbModel {
  _id: Types.ObjectId;
  user: {
    name: string,
    userId: Types.ObjectId | IUserNoSqlDbModel,
  };
  orderItems: IOrderItemNoSqlDbModel[];
}
