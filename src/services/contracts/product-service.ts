import { IProduct, IProductForCreate, IProductSearchParam } from "../../models/product";
import { AggregatedError } from "../../models/utils/aggregated-error";
import { Result } from "../../models/utils/result";

export interface IProductService {
  getProducts(searchParam: IProductSearchParam): Promise<IProduct[]>;
  createProduct(product: IProductForCreate): Promise<void>;
  getProduct(id: string): Promise<IProduct | null>;
  updateProduct(product: IProduct): Promise<Result<boolean, AggregatedError>>;
  deleteProduct(id: string): Promise<void>;
}
