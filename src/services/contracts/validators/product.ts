import { IProduct } from "../../../models/product";
import { AggregatedError } from "../../../models/utils/aggregated-error";

export interface IProductValidator {
  create(product: IProduct): AggregatedError;
  update(product: IProduct): AggregatedError;
}
