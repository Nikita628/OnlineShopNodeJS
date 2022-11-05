import { IOrderItem } from "./order-item";

export interface IOrder {
  id: string;
  orderItems: IOrderItem[];
  totalPrice: number;
}
