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
    return this.validate(product, onCreateRules);
  }

  onUpdate(product: IProduct): AggregatedError | null {
    return this.validate(product, onUpdateRules);
  }

  private validate(product: IProduct, rules: Record<string, string>) {
    const validation = new Validator(product, rules);

    validation.check();

    if (validation.errorCount > 0) {
      return AggregatedError.from(validation.errors.all());
    }

    return null;
  }
}


