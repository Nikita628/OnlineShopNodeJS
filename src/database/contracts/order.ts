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
  _id: string;
  userId: string;
  user?: IUserNoSqlDbModel;
  orderItems?: IOrderItemNoSqlDbModel[];
}
