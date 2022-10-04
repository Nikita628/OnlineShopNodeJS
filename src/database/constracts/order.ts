import { IOrderItemDbModel } from "./order-item";
import { IUserDbModel } from "./user";

export interface IOrderDbModel {
  id: number;
  userId: number;
  user?: IUserDbModel;
  orderItems?: IOrderItemDbModel[];
}

export interface IOrderDbModelCreation extends Omit<IOrderDbModel, "id" | 'user' | 'orderItems'> {}
