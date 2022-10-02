import { IProduct, productMapper } from "../models/product";
import { IProductService } from "./contracts/product-service";
import { Product } from "../database/sql/models/product";

let products: IProduct[] = [
  {
    id: Math.random().toString(),
    title: "adipisicing",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl:
      "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 123.33,
  },
  {
    id: Math.random().toString(),
    title: "amet consectetur",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl:
      "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 444.5,
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

export class ProductServiceSqlDb implements IProductService {
  public async getProducts(): Promise<IProduct[]> {
    const res = await Product.findAll();

    console.log("getProducts", res);

    return res.map((m) => productMapper.toModelFromDbModel(m as any));
  }

  public async createProduct(product: IProduct): Promise<void> {
    await Product.create({
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      title: product.title,
    });
  }

  public async getProduct(id: string): Promise<IProduct | undefined> {
    const res = await Product.findByPk(id);

    return res ? productMapper.toModelFromDbModel(res as any) : undefined;
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

export const productServiceInstance: IProductService =
  new ProductServiceInMemory();
