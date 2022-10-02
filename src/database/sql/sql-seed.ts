import { db } from "./sql";
import { IProductDbModelCreation, Product } from "./models/product";
import { User } from "./models/user";
import { DEFAULT_USER_ID } from "../../utils/constants";
import { CartItem } from "./models/cart-item";
import { Cart } from "./models/cart";

const products: IProductDbModelCreation[] = [
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
    // Product.belongsTo(User, { constraints: true });
    // await db.sync({ force: true });

    // await recreateTables();
    // await fillTables();
  } catch (error) {
    console.error("seed error: ", error);
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
    for (const p of products) {
      const createdProduct = await Product.create({
        description: p.description,
        imageUrl: p.imageUrl,
        price: p.price,
        title: p.title,
        userId: p.userId,
      });
      createdProductIds.push(createdProduct.get().id);
    }
  }

  // populate carts
  const createdCart = await Cart.create({
    userId: DEFAULT_USER_ID,
  });

  // populate cart items
  for (const productId of createdProductIds) {
    await CartItem.create({
      cartId: createdCart.get().id,
      productId: productId,
      quantity: 2,
    });
  }
}

async function recreateTables(): Promise<void> {
  await CartItem.drop();
  await Cart.drop();
  await Product.drop();
  await User.drop();

  await User.sync();
  await Product.sync();
  await Cart.sync();
  await CartItem.sync();
}
