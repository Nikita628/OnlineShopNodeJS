import { IProductSqlDbModel } from "./product";

export interface IOrderItemDbModel {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  product?: IProductSqlDbModel;
}

export interface IOrderItemDbModelCreation
  extends Omit<IOrderItemDbModel, "id" | 'product'> {}
