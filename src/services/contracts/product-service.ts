import { IProduct, IProductForCreate, IProductSearchParam } from "../../models/product";

export interface IProductService {
  getProducts(searchParam: IProductSearchParam): Promise<IProduct[]>;
  createProduct(product: IProductForCreate): Promise<void>;
  getProduct(id: string): Promise<IProduct | null>;
  updateProduct(product: IProduct): Promise<void>;
  deleteProduct(id: string): Promise<void>;
}
