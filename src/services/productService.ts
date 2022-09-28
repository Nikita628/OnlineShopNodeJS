import { IProduct } from "../models/product";

const products: IProduct[] = [{ title: "test1" }, { title: "test2" }];

export class ProductService {
  getProducts(): IProduct[] {
    return [...products];
  }

  addProduct(product: IProduct): void {
    products.push(product);
  }
}

export const instance = new ProductService();