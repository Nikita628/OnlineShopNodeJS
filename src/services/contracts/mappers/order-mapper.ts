import { IOrderNoSqlDbModel, IOrderSqlDbModel } from "../../../database/contracts/order";
import { IOrder } from "../../../models/order/order";

export interface IOrderMapper {
  toModelFromDbModel(item: IOrderSqlDbModel): IOrder;
  toModelFromNoSqlDbModel(item: IOrderNoSqlDbModel): IOrder;
}
