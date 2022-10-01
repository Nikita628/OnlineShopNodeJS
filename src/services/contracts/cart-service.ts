import { ICart } from "../../models/cart";

export interface ICartService {
  addToCart(productId: string): void;
  getCart(cartId: string): ICart;
  deleteFromCart(productId: string): void;
}
