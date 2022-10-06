import { Types } from "mongoose";
import { ICartNoSqlDbModel } from "./cart";

export interface IUserBaseDbModel {
  name: string;
  email: string;
}

export interface IUserSqlDbModel extends IUserBaseDbModel {
  id: number;
}

export interface IUserSqlDbModelForCreate extends Omit<IUserSqlDbModel, "id"> {}

export interface IUserNoSqlDbModel extends IUserBaseDbModel {
  _id: Types.ObjectId;
  cart: ICartNoSqlDbModel;
}
