import {
  IOrderItemNoSqlDbModel,
  IOrderItemSqlDbModel,
} from "../../../database/contracts/order-item";
import { IOrderItem } from "../../../models/order/order-item";

export interface IOrderItemMapper {
  toModelFromDbModel(item: IOrderItemSqlDbModel): IOrderItem;
  toModelFromNoSqlDbModel(item: IOrderItemNoSqlDbModel): IOrderItem;
}
