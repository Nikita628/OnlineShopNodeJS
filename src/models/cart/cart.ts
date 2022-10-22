import { ICartItem } from "./cart-item";

export interface ICart {
  cartItems: ICartItem[];
  totalPrice: number;
}
