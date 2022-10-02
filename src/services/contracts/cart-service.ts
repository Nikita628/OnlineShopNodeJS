import { ICart } from "../../models/cart";

export interface ICartService {
  addToCart(userId: number, productId: string): Promise<void>;
  getCart(userId: number): Promise<ICart | undefined>;
  deleteFromCart(userId: number, productId: string): Promise<void>;
}
