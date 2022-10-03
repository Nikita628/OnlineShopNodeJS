import { IOrder } from "../../models/order";

export interface IOrderService {
  order(userId: number): Promise<void>;
  getOrders(userId: number): Promise<IOrder[]>;
}
