import { ICart } from "../../models/cart/cart";
import {
  ICartNoSqlDbModel,
  ICartSqlDbModel,
} from "../../database/contracts/cart";
import { ICartItem } from "../../models/cart/cart-item";
import { ICartMapper } from "../contracts/mappers/cart-mapper";
import { cartItemMapper } from "..";
import { productTyper } from "../../models/product";

export class CartMapper implements ICartMapper {
  toModelFromDbModel(item: ICartSqlDbModel): ICart {
    let totalPrice = 0;
    let cartItems: Array<ICartItem> = [];

    if (item.cartItems) {
      for (const i of item.cartItems) {
        if (i.product) {
          totalPrice += i.product.price * i.quantity;
          cartItems.push(cartItemMapper.toModelFromDbModel(i));
        }
      }
    }

    return {
      totalPrice,
      cartItems,
    };
  }

  toModelFromNoSqlDbModel(item: ICartNoSqlDbModel): ICart {
    let totalPrice = 0;
    let cartItems: Array<ICartItem> = [];

    if (item.cartItems) {
      for (const i of item.cartItems) {
        if (i.productId && productTyper.isProductNoSqlDbModel(i.productId)) {
          totalPrice += i.productId.price * i.quantity;
          cartItems.push(cartItemMapper.toModelFromNoSqlDbModel(i));
        }
      }
    }

    return {
      totalPrice,
      cartItems,
    };
  }
}
