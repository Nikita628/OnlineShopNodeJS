import { ICart } from "../../models/cart/cart";

export interface ICartService {
  addProductToCart(userId: string, productId: string): Promise<void>;
  getCart(userId: string): Promise<ICart>;
  deleteProductFromCart(userId: string, productId: string): Promise<void>;
  deleteCart(userId: string): Promise<void>;
}
