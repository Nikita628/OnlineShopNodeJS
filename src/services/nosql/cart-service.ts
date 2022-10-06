import { Schema } from "mongoose";
import { ProductModel } from "../../database/nosql/models/product";
import { UserModel } from "../../database/nosql/models/user";
import { Cart } from "../../database/sql/models/cart";
import { CartItem } from "../../database/sql/models/cart-item";
import { Product } from "../../database/sql/models/product";
import { cartMapper, ICart } from "../../models/cart";
import { ICartService } from "../contracts/cart-service";
import { Types } from "mongoose";

export class CartServiceNoSqlDb implements ICartService {
  public async addProductToCart(
    userId: string,
    productId: string
  ): Promise<void> {
    const user = await UserModel.findById(userId);

    if (!user) {
      return;
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
    const user = await UserModel.findById(userId);

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
  ): Promise<void> {}

  public async deleteCart(userId: string): Promise<void> {
    // clear cart in user
  }
}
