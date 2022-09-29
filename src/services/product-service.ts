import { IProduct } from "../models/product";

const products: IProduct[] = [
  {
    title: "test1",
    description: "test descr",
    imageUrl: "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 123.33,
  },
  {
    title: "test2",
    description: "test descr",
    imageUrl: "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 444.5,
  },
];

export class ProductService {
  getProducts(): IProduct[] {
    return [...products];
  }

  addProduct(product: IProduct): void {
    products.push(product);
  }
}

export const productServiceInstance = new ProductService();
