import { orderMapper } from "..";
import { IOrderSqlDbModel } from "../../database/contracts/order";
import { Cart } from "../../database/sql/models/cart";
import { CartItem } from "../../database/sql/models/cart-item";
import { Order } from "../../database/sql/models/order";
import { OrderItem } from "../../database/sql/models/order-item";
import { Product } from "../../database/sql/models/product";
import { IOrder } from "../../models/order/order";
import { IOrderService } from "../contracts/order-service";

export class OrderServiceSqlDb implements IOrderService {
  async order(userId: string): Promise<void> {
    const cartFromDb = await Cart.findOne({
      where: { userId },
    });

    if (!cartFromDb) {
      return;
    }

    const cartItemsFromDb = await CartItem.findAll({
      where: { cartId: cartFromDb.get().id },
    });

    const createdOrder = await Order.create({
      userId: +userId,
    });

    await OrderItem.bulkCreate(
      cartItemsFromDb.map((i) => {
        return {
          orderId: createdOrder.get().id,
          productId: i.get().productId,
          quantity: i.get().quantity,
        };
      })
    );
  }

  async getOrders(userId: string): Promise<IOrder[]> {
    const ordersFromDb = await Order.findAll({ where: { userId } });

    if (!ordersFromDb.length) {
      return [];
    }

    const orderIdToOrderMap: Record<number, IOrderSqlDbModel> = {};

    ordersFromDb.forEach((o) => {
      orderIdToOrderMap[o.get().id] = o.get();
    });

    const orderItemsFromDb = await OrderItem.findAll({
      where: { orderId: ordersFromDb.map((o) => o.get().id) },
      include: [{ as: 'product', model: Product }],
    });

    for (const orderItem of orderItemsFromDb) {
      if (orderIdToOrderMap[orderItem.get().orderId].orderItems) {
        orderIdToOrderMap[orderItem.get().orderId].orderItems?.push(
          orderItem.get()
        );
      } else {
        orderIdToOrderMap[orderItem.get().orderId].orderItems = [
          orderItem.get(),
        ];
      }
    }

    return ordersFromDb.map(o => orderMapper.toModelFromDbModel(o.get()));
  }
}
