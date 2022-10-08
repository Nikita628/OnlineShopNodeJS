import { IOrderItemNoSqlDbModel, IOrderItemSqlDbModel } from "../database/contracts/order-item";
import { IProduct, productMapper } from "./product";

export interface IOrderItem {
  quantity: number;
  product?: IProduct;
}

export const orderItemMapper = {
  toModelFromDbModel(item: IOrderItemSqlDbModel): IOrderItem {
    return {
      quantity: item.quantity,
      product: item.product ? productMapper.toModelFromDbModel(item.product) : undefined,
    };
  },
  toModelFromNoSqlDbModel(item: IOrderItemNoSqlDbModel): IOrderItem {
    return {
      quantity: item.quantity,
      product: productMapper.toModelFromInOrderItemNoSqlDbModel(item.product),
    };
  }
};