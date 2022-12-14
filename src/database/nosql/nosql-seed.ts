import { encryptionService } from "../../services";
import { ProductModel } from "./models/product";
import { UserModel } from "./models/user";

const products = [
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

export async function seedNoSqlDb() {
  try {
    // await clearDb();

    let adminUser = await UserModel.findOne({
      email: { $eq: "admin@admin.com" },
    });

    let testUser = await UserModel.findOne({
      email: { $eq: "test@test.com" },
    });

    if (!adminUser) {
      adminUser = await UserModel.create({
        email: "admin@admin.com",
        name: "admin",
        password: await encryptionService.hash('admin'),
        cart: {
          cartItems: [],
        }
      });
    }

    if (!testUser) {
      adminUser = await UserModel.create({
        email: "test@test.com",
        name: "test",
        password: await encryptionService.hash('test'),
        cart: {
          cartItems: [],
        }
      });
    }

    console.log('admin id', adminUser.id);

    if ((await ProductModel.count()) === 0) {
      const productsToInsert = products.map((p) => ({
        ...p,
        userId: adminUser?.id,
      }));

      await ProductModel.insertMany(productsToInsert);
    }

    console.log("\x1b[32m%s\x1b[0m", "seeding DB finished");
  } catch (error) {
    console.log("\x1b[31m", "seed error:");
    console.log(error);
  }
}

async function clearDb() {
  await UserModel.deleteMany();
  await ProductModel.deleteMany();
}
