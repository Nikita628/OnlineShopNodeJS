import { ProductModel } from "../../database/nosql/models/product";
import { UserModel } from "../../database/nosql/models/user";
import { Cart } from "../../database/sql/models/cart";
import { CartItem } from "../../database/sql/models/cart-item";
import { Product } from "../../database/sql/models/product";
import { cartMapper, ICart } from "../../models/cart";
import { ICartService } from "../contracts/cart-service";

export class CartServiceNoSqlDb implements ICartService {
  public async addProductToCart(
    userId: number,
    productId: string
  ): Promise<void> {
    // get user from db
    // try to find product in the cart
    // if cart contains product, increase quantity of the cart item
    // else add product as cart item
  }

  public async getCart(userId: number): Promise<ICart | undefined> {
    let cartFromDb = await Cart.findOne({ where: { userId } });

    if (cartFromDb) {
      const cartItems = await CartItem.findAll({
        where: { cartId: cartFromDb.get().id },
        include: [{ model: Product, as: "product" }],
      });
      cartFromDb.get().cartItems = cartItems.map((i) => i.get());
    } else {
      cartFromDb = await Cart.create({
        userId,
      });
    }

    return cartMapper.toModelFromDbModel(cartFromDb.get());
  }

  public async deleteProductFromCart(
    userId: number,
    productId: string
  ): Promise<void> {
    const cartFromDb = await Cart.findOne({
      where: { userId },
    });

    if (!cartFromDb) {
      return;
    }

    await CartItem.destroy({
      where: { cartId: cartFromDb.get().id, productId },
    });
  }

  public async deleteCart(userId: number): Promise<void> {
    const cartFromDb = await Cart.findOne({
      where: { userId },
    });

    if (!cartFromDb) {
      return;
    }

    await CartItem.destroy({ where: { cartId: cartFromDb.get().id } });
    await Cart.destroy({ where: { id: cartFromDb.get().id } });
  }
}
