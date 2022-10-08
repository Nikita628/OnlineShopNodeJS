import { ICartItemNoSqlDbModel, ICartItemSqlDbModel } from "./cart-item";
import { IUserSqlDbModel } from "./user";

export interface ICartBaseDbModel {}

export interface ICartSqlDbModel extends ICartBaseDbModel {
  id: number;
  userId: number;
  user?: IUserSqlDbModel;
  cartItems?: ICartItemSqlDbModel[];
}

export interface ICartSqlDbModelForCreate
  extends Omit<ICartSqlDbModel, "id" | "user" | "cartItems"> {}

export interface ICartNoSqlDbModel extends ICartBaseDbModel {
  cartItems: ICartItemNoSqlDbModel[];
}
