import { IProductDbModel } from "./product";

export interface IOrderItemDbModel {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  product?: IProductDbModel;
}

export interface IOrderItemDbModelCreation
  extends Omit<IOrderItemDbModel, "id" | 'product'> {}
