import {
  IProductInOrderItemNoSqlDbModel,
  IProductNoSqlDbModel,
  IProductSqlDbModel,
} from "../../database/contracts/product";
import { IProduct, IProductForCreate } from "../../models/product";
import { isNullish, isNumber, isString } from "../../utils/checks";
import { IProductMapper } from "../contracts/mappers/product-mapper";

export class ProductMapper implements IProductMapper {
  toModel(item: any): IProduct {
    if (isNullish(item)) {
      throw new Error("item is required");
    }

    const mapped = {
      title: item.title,
      imageUrl: item.imageUrl,
      description: item.description,
      price: Number(item.price),
      id: item.id,
      userId: item.userId,
    };

    return mapped;
  }

  toModelForCreate(item: any): IProductForCreate {
    if (isNullish(item)) {
      throw new Error("item is required");
    }

    const mapped = {
      title: item.title,
      imageUrl: item.imageUrl,
      description: item.description,
      price: Number(item.price),
      userId: item.userId,
    };

    // TODO: I know that this is repetitive. Later it should be moved to another module
    // separate runtime type checker
    if (!isString(mapped.title)) {
      throw new Error('title must be string');
    } else if (!isString(mapped.imageUrl)) {
      throw new Error('imageUrl must be string');
    } else if (!isString(mapped.description)) {
      throw new Error('description must be string');
    } else if (!isNumber(mapped.price)) {
      throw new Error('price must be number');
    } else if (!isString(mapped.userId)) {
      throw new Error('userId must be string');
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
