import { IProduct } from "../../models/product";

export interface IProductService {
  getProducts(): IProduct[];
  createProduct(product: IProduct): void;
  getProduct(id: string): IProduct | undefined;
  updateProduct(product: IProduct): void;
  deleteProduct(id: string): void;
}
