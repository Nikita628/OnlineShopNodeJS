import { IOrderItem } from "./order-item";

export interface IOrder {
  orderItems: IOrderItem[];
  totalPrice: number;
}
