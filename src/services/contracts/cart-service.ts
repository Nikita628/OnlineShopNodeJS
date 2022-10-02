import { ICart } from "../../models/cart";

export interface ICartService {
  addToCart(productId: string): Promise<void>;
  getCart(cartId: string): Promise<ICart | undefined>;
  deleteFromCart(productId: string): Promise<void>;
}
