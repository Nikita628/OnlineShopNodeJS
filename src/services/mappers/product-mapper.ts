import {
  IProductInOrderItemNoSqlDbModel,
  IProductNoSqlDbModel,
  IProductSqlDbModel,
} from "../../database/contracts/product";
import { IProduct, IProductForCreate } from "../../models/product";
import { isNullish, isNumber, isString } from "../../utils/type-checks";
import { IProductMapper } from "../contracts/mappers/product-mapper";

const typesMap: any = {
  title: isString,
  imageUrl: isString,
  description: isString,
  price: isNumber,
  userId: isString,
  id: isString,
};

export class ProductMapper implements IProductMapper {
  toModel(item: any): IProduct {
    if (isNullish(item)) {
      throw new Error("item is required");
    }

    const mapped: any = {
      title: item.title,
      imageUrl: item.imageUrl,
      description: item.description,
      price: Number(item.price),
      id: item.id,
      userId: item.userId,
    };

    // TODO: implement runtime type checker or use an existing one
    for (const key in mapped) {
      if (!typesMap[key](mapped[key])) {
        throw new Error(`field ${key} has invalid type`);
      }
    }

    return mapped;
  }

  toModelForCreate(item: any): IProductForCreate {
    if (isNullish(item)) {
      throw new Error("item is required");
    }

    const mapped: any = {
      title: item.title,
      imageUrl: item.imageUrl,
      description: item.description,
      price: Number(item.price),
      userId: item.userId,
    };

    // TODO: implement runtime type checker or use an existing one
    for (const key in mapped) {
      if (!typesMap[key](mapped[key])) {
        throw new Error(`field ${key} has invalid type`);
      }
    }

    return mapped;
  }

  toModelFromDbModel(item: IProductSqlDbModel): IProduct {
    return {
      description: item.description,
      id: item.id.toString(),
      imageUrl: item.imageUrl,
      price: item.price,
      title: item.title,
      userId: item.userId.toString(),
    };
  }

  toModelFromNoSqlDbModel(item: IProductNoSqlDbModel): IProduct {
    return {
      description: item.description,
      id: item._id.toString(),
      imageUrl: item.imageUrl,
      price: item.price,
      title: item.title,
      userId: item.userId.toString(),
    };
  }

  toModelFromInOrderItemNoSqlDbModel(
    item: IProductInOrderItemNoSqlDbModel
  ): IProduct {
    return {
      description: item.description,
      id: item.id,
      imageUrl: item.imageUrl,
      price: item.price,
      title: item.title,
      userId: item.userId,
    };
  }
}
