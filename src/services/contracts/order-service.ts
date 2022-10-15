import { IOrder } from "../../models/order/order";

export interface IOrderService {
  order(userId: string): Promise<void>;
  getOrders(userId: string): Promise<IOrder[]>;
}
