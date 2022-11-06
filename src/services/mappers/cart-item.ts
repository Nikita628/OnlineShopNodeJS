import { productMapper } from "..";
import {
  ICartItemNoSqlDbModel,
  ICartItemSqlDbModel,
} from "../../database/contracts/cart-item";
import { ICartItem } from "../../models/cart/cart-item";
import { IProduct, productTyper } from "../../models/product";
import { ICartItemMapper } from "../contracts/mappers/cart-item-mapper";

export class CartItemMapper implements ICartItemMapper {
  toModelFromDbModel(item: ICartItemSqlDbModel): ICartItem {
    return {
      quantity: item.quantity,
      product: item.product
        ? productMapper.toModelFromDbModel(item.product)
        : undefined,
    };
  }

  toModelFromNoSqlDbModel(item: ICartItemNoSqlDbModel): ICartItem {
    let product: IProduct | undefined;

    if (productTyper.isProductNoSqlDbModel(item.productId)) {
      product = productMapper.toModelFromNoSqlDbModel(item.productId);
    }

    return {
      quantity: item.quantity,
      product,
    };
  }
};