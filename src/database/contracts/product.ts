import { Types } from "mongoose";
import { IUserNoSqlDbModel } from "./user";

export interface IBaseProductDbModel {
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface IProductSqlDbModel extends IBaseProductDbModel {
  id: number;
  userId: number;
}

export interface IProductSqlDbModelForCreate
  extends Omit<IProductSqlDbModel, "id"> {}

export interface IProductNoSqlDbModel extends IBaseProductDbModel {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
}

export interface IProductInOrderItemNoSqlDbModel extends IBaseProductDbModel {
  id: string;
  userId: string;
}
