import { Product } from "./models/product";
import { User } from "./models/user";
import { DEFAULT_USER_ID } from "../../utils/constants";
import { CartItem } from "./models/cart-item";
import { Cart } from "./models/cart";
import { Order } from "./models/order";
import { OrderItem } from "./models/order-item";
import { IProductSqlDbModelForCreate } from "../contracts/product";
import { ICartItemDbModelCreation } from "../contracts/cart-item";
import { IOrderItemDbModelCreation } from "../contracts/order-item";

const products: IProductSqlDbModelForCreate[] = [
  {
    title: "adipisicing",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl:
      "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 123.33,
    userId: DEFAULT_USER_ID,
  },
  {
    title: "amet consectetur",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl:
      "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 444.5,
    userId: DEFAULT_USER_ID,
  },
];

export async function seedSqlDb() {
  try {
    await recreateTables();
    await fillTables();

    console.log("\x1b[32m%s\x1b[0m", "seeding DB finished");
  } catch (error) {
    console.log("\x1b[31m", "seed error:");
    console.log(error);
  }
}

async function fillTables(): Promise<void> {
  // populate users
  const usersCount = await User.count();

  if (usersCount === 0) {
    await User.create({
      email: "admin@admin.com",
      name: "admin",
    });
  }

  // populate products
  const productsCount = await Product.count();
  const createdProductIds: number[] = [];

  if (productsCount === 0) {
    const createdProducts = await Product.bulkCreate(
      products.map<IProductSqlDbModelForCreate>((p) => ({
        description: p.description,
        imageUrl: p.imageUrl,
        price: p.price,
        title: p.title,
        userId: p.userId,
      }))
    );

    createdProductIds.push(...createdProducts.map((p) => p.get().id));
  }

  // populate carts
  const cartsCount = await Cart.count();

  if (cartsCount === 0) {
    const createdCart = await Cart.create({
      userId: DEFAULT_USER_ID,
    });

    // populate cart items
    await CartItem.bulkCreate(
      createdProductIds.map<ICartItemDbModelCreation>((id) => ({
        cartId: createdCart.get().id,
        productId: id,
        quantity: 2,
      }))
    );
  }

  // populate orders
  const ordersCount = await Order.count();

  if (ordersCount === 0) {
    const createdOrder = await Order.create({
      userId: DEFAULT_USER_ID,
    });

    // populate order items
    await OrderItem.bulkCreate(
      createdProductIds.map<IOrderItemDbModelCreation>((id) => ({
        orderId: createdOrder.get().id,
        productId: id,
        quantity: 3,
      }))
    );
  }
}

async function recreateTables(): Promise<void> {
  await OrderItem.drop();
  await Order.drop();
  await CartItem.drop();
  await Cart.drop();
  await Product.drop();
  await User.drop();

  await User.sync();
  await Product.sync();
  await Cart.sync();
  await CartItem.sync();
  await Order.sync();
  await OrderItem.sync();
}
