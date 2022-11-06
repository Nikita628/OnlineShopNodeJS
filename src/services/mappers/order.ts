import { orderItemMapper } from "..";
import {
  IOrderNoSqlDbModel,
  IOrderSqlDbModel,
} from "../../database/contracts/order";
import { IOrder } from "../../models/order/order";
import { IOrderItem } from "../../models/order/order-item";
import { IOrderMapper } from "../contracts/mappers/order-mapper";

export class OrderMapper implements IOrderMapper {
  toModelFromDbModel(item: IOrderSqlDbModel): IOrder {
    let totalPrice = 0;
    const orderItems: Array<IOrderItem> = [];

    if (item.orderItems) {
      for (const i of item.orderItems) {
        if (i.product) {
          totalPrice += i.product.price * i.quantity;
          orderItems.push(orderItemMapper.toModelFromDbModel(i));
        }
      }
    }

    return {
      id: item.id.toString(),
      totalPrice,
      orderItems,
    };
  }

  toModelFromNoSqlDbModel(item: IOrderNoSqlDbModel): IOrder {
    let totalPrice = 0;
    const orderItems: Array<IOrderItem> = [];

    if (item.orderItems) {
      for (const i of item.orderItems) {
        if (i.product) {
          totalPrice += i.product.price * i.quantity;
          orderItems.push(orderItemMapper.toModelFromNoSqlDbModel(i));
        }
      }
    }

    return {
      id: item._id.toString(),
      totalPrice,
      orderItems,
    };
  }
}
