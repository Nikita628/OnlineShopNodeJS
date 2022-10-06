import { Types } from "mongoose";
import { IProductNoSqlDbModel, IProductSqlDbModel } from "./product";

export interface ICartItemBaseDbModel {
  quantity: number;
}

export interface ICartItemSqlDbModel extends ICartItemBaseDbModel {
  id: number;
  cartId: number;
  productId: number;
  product?: IProductSqlDbModel;
}

export interface ICartItemSqlDbModelForCreate
  extends Omit<ICartItemSqlDbModel, "id" | "product"> {}

export interface ICartItemNoSqlDbModel extends ICartItemBaseDbModel {
  productId: Types.ObjectId | IProductNoSqlDbModel;
}
