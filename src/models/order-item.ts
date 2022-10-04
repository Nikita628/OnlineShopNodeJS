import { IOrderItemDbModel } from "../database/constracts/order-item";
import { IProduct, productMapper } from "./product";

export interface IOrderItem {
  quantity: number;
  product?: IProduct;
}

export const OrderItemMapper = {
  toModelFromDbModel(item: IOrderItemDbModel): IOrderItem {
    return {
      quantity: item.quantity,
      product: item.product ? productMapper.toModelFromDbModel(item.product) : undefined,
    }
  }
};