import { IProduct } from "../../models/product";

export interface IProductService {
  getProducts(): Promise<IProduct[]>;
  createProduct(product: IProduct): Promise<void>;
  getProduct(id: string): Promise<IProduct | undefined>;
  updateProduct(product: IProduct): Promise<void>;
  deleteProduct(id: string): Promise<void>;
}
