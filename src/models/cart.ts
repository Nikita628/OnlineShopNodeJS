import { ICartItem } from "./cart-item";

export interface ICart {
  products: ICartItem[];
  totalPrice: number;
}
