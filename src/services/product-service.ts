import { IProduct, IProductSearchParam, productMapper } from "../models/product";
import { IProductService } from "./contracts/product-service";
import { IProductDbModel, Product } from "../database/sql/models/product";
import { FindOptions } from "sequelize";

//#region initial implementetaion for testing purposes
let products: IProduct[] = [
  {
    id: Math.random().toString(),
    title: "adipisicing",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl:
      "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 123.33,
    userId: 1,
  },
  {
    id: Math.random().toString(),
    title: "amet consectetur",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl:
      "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 444.5,
    userId: 1,
  },
];

export class ProductServiceInMemory implements IProductService {
  public async getProducts(): Promise<IProduct[]> {
    return [...products];
  }

  public async createProduct(product: IProduct): Promise<void> {
    product.id = Math.random().toString();
    products.push(product);
  }

  public async getProduct(id: string): Promise<IProduct | undefined> {
    return products.find((p) => p.id === id);
  }

  public async updateProduct(product: IProduct): Promise<void> {
    const existing = products.find((p) => p.id === product.id);

    if (existing) {
      existing.description = product.description;
      existing.imageUrl = product.imageUrl;
      existing.price = product.price;
      existing.title = product.title;
    }
  }

  public async deleteProduct(productId: string): Promise<void> {
    products = products.filter((p) => p.id !== productId);
  }
}
//#endregion

export class ProductServiceSqlDb implements IProductService {
  public async getProducts(searchParam: IProductSearchParam): Promise<IProduct[]> {
    const filter: FindOptions<IProductDbModel> = {};

    if (searchParam.userId) {
      filter.where = {};
      filter.where.userId = searchParam.userId;
    }

    const dbModels = await Product.findAll(filter);

    return dbModels.map((m) => productMapper.toModelFromDbModel(m.get()));
  }

  public async createProduct(product: IProduct): Promise<void> {
    await Product.create({
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      title: product.title,
      userId: product.userId,
    });
  }

  public async getProduct(id: string): Promise<IProduct | undefined> {
    const dbModel = await Product.findOne({ where: { id } });

    return dbModel
      ? productMapper.toModelFromDbModel(dbModel.get())
      : undefined;
  }

  public async updateProduct(product: IProduct): Promise<void> {
    await Product.update(
      {
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        title: product.title,
      },
      { where: { id: product.id } }
    );
  }

  public async deleteProduct(productId: string): Promise<void> {
    await Product.destroy({ where: { id: productId } });
  }
}

export const productServiceInstance: IProductService =
  new ProductServiceSqlDb();
