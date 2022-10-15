import { UserModel } from "../../database/nosql/models/user";
import { cartMapper, ICart } from "../../models/cart/cart";
import { ICartService } from "../contracts/cart-service";
import { Types } from "mongoose";

export class CartServiceNoSqlDb implements ICartService {
  public async addProductToCart(
    userId: string,
    productId: string
  ): Promise<void> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error(`user with id ${userId} not found`);
    }

    const productFromCart = user.cart.cartItems.find(
      (i) => i.productId.toString() === productId
    );

    if (productFromCart) {
      productFromCart.quantity++;
    } else {
      user.cart.cartItems.push({
        productId: new Types.ObjectId(productId),
        quantity: 1,
      });
    }

    await user.save();
  }

  public async getCart(userId: string): Promise<ICart> {
    const user = await UserModel.findById(userId).populate('cart.cartItems.productId');

    if (!user) {
      throw new Error(`user with id ${userId} not found`);
    }

    if (!user.cart) {
      user.cart = { cartItems: [] };
      await user.save();
    }

    return cartMapper.toModelFromNoSqlDbModel(user.cart);
  }

  public async deleteProductFromCart(
    userId: string,
    productId: string
  ): Promise<void> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error(`user with id ${userId} not found`);
    }

    user.cart.cartItems = user.cart.cartItems.filter(
      (i) => i.productId.toString() !== productId
    );

    await user.save();
  }

  public async deleteCart(userId: string): Promise<void> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error(`user with id ${userId} not found`);
    }

    user.cart = { cartItems: [] };

    await user.save();
  }
}
