import { ICart } from "../../models/cart";

export interface ICartService {
  addProductToCart(userId: number, productId: string): Promise<void>;
  getCart(userId: number): Promise<ICart | undefined>;
  deleteProductFromCart(userId: number, productId: string): Promise<void>;
  deleteCart(userId: number): Promise<void>;
}
