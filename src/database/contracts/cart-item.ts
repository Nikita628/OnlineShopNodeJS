import { IProductSqlDbModel } from "./product";

export interface ICartItemDbModel {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product?: IProductSqlDbModel;
}

export interface ICartItemDbModelCreation
  extends Omit<ICartItemDbModel, "id" | 'product'> {}

