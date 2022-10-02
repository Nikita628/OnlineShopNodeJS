import { Cart } from "../database/sql/models/cart";
import { CartItem } from "../database/sql/models/cart-item";
import { Product } from "../database/sql/models/product";
import { cartMapper, ICart } from "../models/cart";
import { ICartService } from "./contracts/cart-service";

export class CartServiceSqlDb implements ICartService {
  public async addToCart(userId: number, productId: string): Promise<void> {
    const cartFromDb = await Cart.findOne({
      where: { userId },
    });

    if (!cartFromDb) {
      return;
    }

    const productFromDb = await Product.findOne({ where: { id: productId } });

    if (!productFromDb) {
      return;
    }

    const cartItems = await CartItem.findAll({
      where: { cartId: cartFromDb.get().id },
    });

    const cartItemFromDb = cartItems.find(
      (i) => i.get().productId === +productId
    );

    if (cartItemFromDb) {
      await CartItem.update(
        {
          quantity: cartItemFromDb.get().quantity + 1,
        },
        { where: { id: cartItemFromDb.get().id } }
      );
    } else {
      await CartItem.create({
        cartId: cartFromDb.get().id,
        productId: +productId,
        quantity: 1,
      });
    }
  }

  public async getCart(userId: number): Promise<ICart | undefined> {
    const cartFromDb = await Cart.findOne({ where: { userId } });

    if (cartFromDb) {
      const cartItems = await CartItem.findAll({
        where: { cartId: cartFromDb.get().id },
        include: [{ model: Product, as: "product" }],
      });
      cartFromDb.get().cartItems = cartItems.map((i) => i.get());

      return cartMapper.toModelFromDbModel(cartFromDb.get());
    }

    return undefined;
  }

  public async deleteFromCart(
    userId: number,
    productId: string
  ): Promise<void> {
    const cartFromDb = await Cart.findOne({
      where: { userId },
    });

    if (!cartFromDb) {
      return;
    }

    const cartItems = await CartItem.findAll({
      where: { cartId: cartFromDb.get().id },
    });

    const cartItemFromDb = cartItems.find(
      (i) => i.get().productId === +productId
    );

    if (cartItemFromDb) {
      await CartItem.destroy({ where: { id: cartItemFromDb.get().id } });
    }
  }
}

export const cartServiceInstance: ICartService = new CartServiceSqlDb();
