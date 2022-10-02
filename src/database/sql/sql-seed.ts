import { db } from "./sql";
import { IProductDbModelCreation, Product } from "./models/product";

const products: IProductDbModelCreation[] = [
  {
    title: "adipisicing",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl:
      "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 123.33,
  },
  {
    title: "amet consectetur",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl:
      "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 444.5,
  },
];

export async function seedSqlDb() {
  try {
    await db.sync();

    const count = await Product.count();

    if (count === 0) {
      for (const p of products) {
        await Product.create({
          description: p.description,
          imageUrl: p.imageUrl,
          price: p.price,
          title: p.title,
        });
      }
    }
  } catch (error) {
    console.error("seed error: ", error);
  }
}
