import { IProduct } from "../models/product";

let products: IProduct[] = [
  {
    id: Math.random().toString(),
    title: "adipisicing",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl: "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 123.33,
  },
  {
    id: Math.random().toString(),
    title: "amet consectetur",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl: "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 444.5,
  },
];

export class ProductService {
  public getProducts(): IProduct[] {
    return [...products];
  }

  public addProduct(product: IProduct): void {
    product.id = Math.random().toString();
    products.push(product);
  }

  public getProduct(id: string): IProduct | undefined {
    return products.find(p => p.id === id);
  }

  public updateProduct(product: IProduct): void {
    const existing = products.find(p => p.id === product.id);

    if (existing) {
      existing.description = product.description;
      existing.imageUrl = product.imageUrl;
      existing.price = product.price;
      existing.title = product.title;
    }
  }

  public deleteProduct(productId: string): void {
    products = products.filter(p => p.id !== productId);
  }
}

export const productServiceInstance = new ProductService();
