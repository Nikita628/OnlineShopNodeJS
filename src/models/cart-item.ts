import { ICartItemSqlDbModel } from "../database/contracts/cart-item";
import { IProduct, productMapper } from "./product";

export interface ICartItem {
  quantity: number;
  product?: IProduct;
}

export const cartItemMapper = {
  toModelFromDbModel(item: ICartItemSqlDbModel): ICartItem {
    return {
      quantity: item.quantity,
      product: item.product ? productMapper.toModelFromDbModel(item.product) : undefined,
    }
  }
};