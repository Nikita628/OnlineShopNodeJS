import { productMapper } from "..";
import {
  IOrderItemNoSqlDbModel,
  IOrderItemSqlDbModel,
} from "../../database/contracts/order-item";
import { IOrderItem } from "../../models/order/order-item";
import { IOrderItemMapper } from "../contracts/mappers/order-item-mapper";

export class OrderItemMapper implements IOrderItemMapper {
  toModelFromDbModel(item: IOrderItemSqlDbModel): IOrderItem {
    return {
      quantity: item.quantity,
      product: item.product
        ? productMapper.toModelFromDbModel(item.product)
        : undefined,
    };
  }

  toModelFromNoSqlDbModel(item: IOrderItemNoSqlDbModel): IOrderItem {
    return {
      quantity: item.quantity,
      product: productMapper.toModelFromInOrderItemNoSqlDbModel(item.product),
    };
  }
}
