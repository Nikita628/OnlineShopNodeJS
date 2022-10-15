import {
  ICartItemNoSqlDbModel,
  ICartItemSqlDbModel,
} from "../../database/contracts/cart-item";
import { IProduct, productMapper, productTyper } from "../product";

export interface ICartItem {
  quantity: number;
  product?: IProduct;
}

export const cartItemMapper = {
  toModelFromDbModel(item: ICartItemSqlDbModel): ICartItem {
    return {
      quantity: item.quantity,
      product: item.product
        ? productMapper.toModelFromDbModel(item.product)
        : undefined,
    };
  },
  toModelFromNoSqlDbModel(item: ICartItemNoSqlDbModel): ICartItem {
    let product: IProduct | undefined;

    if (productTyper.isProductNoSqlDbModel(item.productId)) {
      product = productMapper.toModelFromNoSqlDbModel(item.productId);
    }

    return {
      quantity: item.quantity,
      product,
    };
  },
};
