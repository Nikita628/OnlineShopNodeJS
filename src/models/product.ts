import { Types } from "mongoose";
import {
  IProductInOrderItemNoSqlDbModel,
  IProductNoSqlDbModel,
  IProductSqlDbModel,
} from "../database/contracts/product";
import { DEFAULT_USER_ID } from "../utils/constants";

export interface IProduct {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  userId: string;
}

export interface IProductSearchParam {
  userId?: string;
}

export const productMapper = {
  toModel(item: any): IProduct {
    return {
      title: item.title || "",
      imageUrl:
        item.imageUrl ||
        "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
      description: item.description || "",
      price: Number(item.price) || 0,
      id: item.id || "",
      userId: item.userId || DEFAULT_USER_ID,
    };
  },
  toModelFromDbModel(item: IProductSqlDbModel): IProduct {
    return {
      description: item.description,
      id: item.id.toString(),
      imageUrl: item.imageUrl,
      price: item.price,
      title: item.title,
      userId: item.userId.toString(),
    };
  },
  toModelFromNoSqlDbModel(item: IProductNoSqlDbModel): IProduct {
    return {
      description: item.description,
      id: item._id.toString(),
      imageUrl: item.imageUrl,
      price: item.price,
      title: item.title,
      userId: item.userId.toString(),
    };
  },
  toModelFromInOrderItemNoSqlDbModel(item: IProductInOrderItemNoSqlDbModel): IProduct {
    return {
      description: item.description,
      id: item.id,
      imageUrl: item.imageUrl,
      price: item.price,
      title: item.title,
      userId: item.userId,
    };
  }
};

export const productTyper = {
  isProductNoSqlDbModel(item: any): item is IProductNoSqlDbModel {
    const is: boolean = (
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
      typeof item.description === "string"
    );

    if (!is) {
      throw new Error('[isProductNoSqlDbModel]: item is not product')
    }

    return is;
  },
};
