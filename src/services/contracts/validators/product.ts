import { IProduct } from "../../../models/product";
import { AggregatedError } from "../../../models/utils/aggregated-error";

export interface IProductValidator {
  onCreate(product: IProduct): AggregatedError | null;
  onUpdate(product: IProduct): AggregatedError | null;
}
