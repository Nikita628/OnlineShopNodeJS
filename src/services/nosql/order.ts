import { ICartItemNoSqlDbModel } from "../../database/contracts/cart-item";
import { OrderModel } from "../../database/nosql/models/order";
import { UserModel } from "../../database/nosql/models/user";
import { IOrder, orderMapper } from "../../models/order/order";
import { productTyper } from "../../models/product";
import { IOrderService } from "../contracts/order-service";

export class OrderServiceNoSqlDb implements IOrderService {
  async order(userId: string): Promise<void> {
    const user = await UserModel.findById(userId).populate(
      "cart.cartItems.productId"
    );

    if (!user) {
      throw new Error(`user with id ${userId} not found`);
    }

    await OrderModel.create({
      user: {
        name: user.name,
        userId: user._id,
      },
      orderItems: user.cart.cartItems.map(this.mapCartItemToOrderItem),
    });
  }

  private mapCartItemToOrderItem(cartItem: ICartItemNoSqlDbModel) {
    if (productTyper.isProductNoSqlDbModel(cartItem.productId)) {
      return {
        quantity: cartItem.quantity,
        product: {
          id: cartItem.productId._id.toString(),
          description: cartItem.productId.description,
          imageUrl: cartItem.productId.imageUrl,
          price: cartItem.productId.price,
          title: cartItem.productId.title,
          userId: cartItem.productId.userId.toString(),
        },
      };
    }
  }

  async getOrders(userId: string): Promise<IOrder[]> {
    const ordersFromDb = await OrderModel.find({
      "user.userId": { $eq: userId },
    });

    return ordersFromDb.map((o) => orderMapper.toModelFromNoSqlDbModel(o));
  }
}
