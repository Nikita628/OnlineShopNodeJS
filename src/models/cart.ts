import { ICartDbModel } from "../database/sql/models/cart";
import { cartItemMapper, ICartItem } from "./cart-item";

export interface ICart {
  cartItems: ICartItem[];
  totalPrice: number;
}

export const cartMapper = {
  toModelFromDbModel(item: ICartDbModel): ICart {
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
  }
};