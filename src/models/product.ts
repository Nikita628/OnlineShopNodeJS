import { Types } from "mongoose";
import { IProductNoSqlDbModel } from "../database/contracts/product";
import { IPagination } from "./utils/pagination";

export interface IProductBase {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export interface IProduct extends IProductBase {
  id: string;
  userId: string;
}

export interface IProductForCreate extends IProductBase {
  userId: string;
}

export interface IProductSearchParam extends IPagination {
  userId?: string;
}

export const productTyper = {
  isProductNoSqlDbModel(item: any): item is IProductNoSqlDbModel {
    const is: boolean =
      item &&
      item._id &&
      item._id instanceof Types.ObjectId &&
      item.userId &&
      item.userId instanceof Types.ObjectId &&
      item.title &&
      typeof item.title === "string" &&
      item.price &&
      typeof item.price === "number" &&
      item.imageUrl &&
      typeof item.imageUrl === "string" &&
      item.description &&
      typeof item.description === "string";

    if (!is) {
      throw new Error("[isProductNoSqlDbModel]: item is not product");
    }

    return is;
  },
};
