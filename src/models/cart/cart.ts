import { ICartNoSqlDbModel, ICartSqlDbModel } from "../../database/contracts/cart";
import { cartItemMapper, ICartItem } from "./cart-item";
import { productTyper } from "../product";

export interface ICart {
  cartItems: ICartItem[];
  totalPrice: number;
}

export const cartMapper = {
  toModelFromDbModel(item: ICartSqlDbModel): ICart {
    let totalPrice = 0;
    let cartItems: Array<ICartItem> = [];

    if (item.cartItems) {
      for (const i of item.cartItems) {
        if (i.product) {
          totalPrice += i.product.price * i.quantity;
          cartItems.push(cartItemMapper.toModelFromDbModel(i))
        }
      }
    }

    return {
      totalPrice,
      cartItems,
    }
  },
  toModelFromNoSqlDbModel(item: ICartNoSqlDbModel): ICart {
    let totalPrice = 0;
    let cartItems: Array<ICartItem> = [];

    if (item.cartItems) {
      for (const i of item.cartItems) {
        if (i.productId && productTyper.isProductNoSqlDbModel(i.productId)) {
          totalPrice += i.productId.price * i.quantity;
          cartItems.push(cartItemMapper.toModelFromNoSqlDbModel(i))
        }
      }
    }

    return {
      totalPrice,
      cartItems,
    }
  }
};