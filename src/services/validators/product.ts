import { IProduct } from "../../models/product";
import { AggregatedError } from "../../models/utils/aggregated-error";
import { IProductValidator } from "../contracts/validators/product";
import Validator from "validatorjs";

const onCreateRules: Record<keyof Omit<IProduct, "id">, string> = {
  description: "required",
  imageUrl: "required",
  price: "required|min:0",
  title: "required",
  userId: "required",
};

const onUpdateRules: Record<keyof IProduct, string> = {
  ...onCreateRules,
  id: "required",
};

export class ProductValidator implements IProductValidator {
  onCreate(product: IProduct): AggregatedError | null {
    const validation = new Validator(product, onCreateRules);

    if (validation.fails()) {
      // construct aggregate error
    }

    return null;
  }

  onUpdate(product: IProduct): AggregatedError | null {
    const validation = new Validator(product, onUpdateRules);

    validation.check();

    if (validation.errorCount > 0) {
      return AggregatedError.from(validation.errors.all());
    }

    return null;
  }
}


