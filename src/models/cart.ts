import { IProduct } from "./product";

export interface ICart {
  products: { quantity: number, product: IProduct }[];
  totalPrice: number;
}
