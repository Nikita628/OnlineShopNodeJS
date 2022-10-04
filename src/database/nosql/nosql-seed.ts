import { DEFAULT_USER_ID } from "../../utils/constants";
import { IProductNoSqlDbModelForCreate } from "../contracts/product";
import { ProductModel } from "./models/product";

const products: IProductNoSqlDbModelForCreate[] = [
  {
    title: "adipisicing",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl:
      "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 123.33,
    userId: DEFAULT_USER_ID.toString(),
  },
  {
    title: "amet consectetur",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl:
      "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 444.5,
    userId: DEFAULT_USER_ID.toString(),
  },
];

export async function seedNoSqlDb() {
  try {
    // await clearDb();

    if ((await ProductModel.count()) === 0) {
        await ProductModel.insertMany(products);
    }

    const res = await ProductModel.find();

    console.log(res);

    console.log("\x1b[32m%s\x1b[0m", "seeding DB finished");
  } catch (error) {
    console.log("\x1b[31m", "seed error:");
    console.log(error);
  }
}

async function clearDb() {
    await ProductModel.deleteMany();
}