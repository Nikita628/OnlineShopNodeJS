import { IProductNoSqlDbModel, IProductSqlDbModel } from "../database/contracts/product";
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
      title: item.title || '',
      imageUrl: item.imageUrl || 'https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg',
      description: item.description || '',
      price: Number(item.price) || 0,
      id: item.id || '',
      userId: item.userId || DEFAULT_USER_ID,
    }
  },
  toModelFromDbModel(item: IProductSqlDbModel): IProduct {
    return {
      description: item.description,
      id: item.id.toString(),
      imageUrl: item.imageUrl,
      price: item.price,
      title: item.title,
      userId: item.userId.toString(),
    }
  },
  toModelFromNoSqlDbModel(item: IProductNoSqlDbModel): IProduct {
    return {
      description: item.description,
      id: item._id.toString(),
      imageUrl: item.imageUrl,
      price: item.price,
      title: item.title,
      userId: item.userId.toString(),
    }
  }
};
