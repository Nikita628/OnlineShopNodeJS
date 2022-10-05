import { IOrderSqlDbModel } from "../database/contracts/order";
import { OrderItemMapper, IOrderItem } from "./order-item";

export interface IOrder {
  orderItems: IOrderItem[];
  totalPrice: number;
}

export const orderMapper = {
  toModelFromDbModel(item: IOrderSqlDbModel): IOrder {
    let totalPrice = 0;
    const orderItems: Array<IOrderItem> = [];

    if (item.orderItems) {
      for (const i of item.orderItems) {
        if (i.product) {
          totalPrice += i.product.price * i.quantity;
          orderItems.push(OrderItemMapper.toModelFromDbModel(i))
        }
      }
    }

    return {
      totalPrice,
      orderItems,
    }
  }
};