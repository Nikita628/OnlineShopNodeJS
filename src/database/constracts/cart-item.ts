import { IProductDbModel } from "./product";

export interface ICartItemDbModel {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product?: IProductDbModel;
}

export interface ICartItemDbModelCreation
  extends Omit<ICartItemDbModel, "id" | 'product'> {}

