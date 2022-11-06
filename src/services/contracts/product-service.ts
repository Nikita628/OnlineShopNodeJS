import { IProduct, IProductForCreate, IProductSearchParam } from "../../models/product";
import { AggregatedError } from "../../models/utils/aggregated-error";
import { IPage } from "../../models/utils/pagination";
import { Result } from "../../models/utils/result";

export interface IProductService {
  getProducts(searchParam: IProductSearchParam): Promise<IPage<IProduct>>;
  createProduct(product: IProductForCreate): Promise<Result<boolean, AggregatedError>>;
  getProduct(id: string): Promise<IProduct | null>;
  updateProduct(product: IProduct): Promise<Result<boolean, AggregatedError>>;
  deleteProduct(id: string): Promise<void>;
}
