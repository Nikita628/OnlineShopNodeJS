import { IProduct, IProductSearchParam } from "../../models/product";

export interface IProductService {
  getProducts(searchParam: IProductSearchParam): Promise<IProduct[]>;
  createProduct(product: IProduct): Promise<void>;
  getProduct(id: string): Promise<IProduct | undefined>;
  updateProduct(product: IProduct): Promise<void>;
  deleteProduct(id: string): Promise<void>;
}
