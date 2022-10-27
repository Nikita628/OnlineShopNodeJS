import { IProduct, IProductForCreate } from "../../../models/product";
import { AggregatedError } from "../../../models/utils/aggregated-error";

export interface IProductValidator {
  onCreate(product: IProductForCreate): AggregatedError | null;
  onUpdate(product: IProduct): AggregatedError | null;
}
