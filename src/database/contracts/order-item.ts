import {
  IBaseProductDbModel,
  IProductInOrderItemNoSqlDbModel,
  IProductNoSqlDbModel,
  IProductSqlDbModel,
} from "./product";

export interface IOrderItemBaseDbModel {
  quantity: number;
}

export interface IOrderItemSqlDbModel extends IOrderItemBaseDbModel {
  id: number;
  orderId: number;
  productId: number;
  product?: IProductSqlDbModel;
}

export interface IOrderItemDbModelCreation
  extends Omit<IOrderItemSqlDbModel, "id" | "product"> {}

export interface IOrderItemNoSqlDbModel extends IOrderItemBaseDbModel {
  product: IProductInOrderItemNoSqlDbModel;
}
