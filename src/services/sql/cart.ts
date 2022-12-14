import { cartMapper } from "..";
import { Cart } from "../../database/sql/models/cart";
import { CartItem } from "../../database/sql/models/cart-item";
import { Product } from "../../database/sql/models/product";
import { ICart } from "../../models/cart/cart";
import { ICartService } from "../contracts/cart-service";

export class CartServiceSqlDb implements ICartService {
  public async addProductToCart(
    userId: string,
    productId: string
  ): Promise<void> {
    let cartFromDb = await Cart.findOne({
      where: { userId },
    });

    if (!cartFromDb) {
      cartFromDb = await Cart.create({ userId: +userId });
    }

    const productFromDb = await Product.findOne({ where: { id: productId } });

    if (!productFromDb) {
      return;
    }

    const cartItemFromDb = await CartItem.findOne({
      where: { cartId: cartFromDb.get().id, productId },
    });

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

  public async getCart(userId: string): Promise<ICart> {
    let cartFromDb = await Cart.findOne({ where: { userId } });

    if (cartFromDb) {
      const cartItems = await CartItem.findAll({
        where: { cartId: cartFromDb.get().id },
        include: [{ model: Product, as: "product" }],
      });
      cartFromDb.get().cartItems = cartItems.map((i) => i.get());
    } else {
      cartFromDb = await Cart.create({
        userId: +userId,
      });
    }

    return cartMapper.toModelFromDbModel(cartFromDb.get());
  }

  public async deleteProductFromCart(
    userId: string,
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

  public async deleteCart(userId: string): Promise<void> {
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
