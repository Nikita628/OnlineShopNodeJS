import { ILoginData, ISignupData } from "../../models/auth";
import { isNullish, isString } from "../../utils/type-checks";
import { IAuthMapper } from "../contracts/mappers/auth-mapper";

export class AuthMapper implements IAuthMapper {
  toSignupData(item: any): ISignupData {
    if (isNullish(item)) {
      throw new Error("item is required");
    }

    const mapped: any = {
      email: item.email,
      password: item.password,
      name: item.name,
      passwordConfirmation: item.passwordConfirmation,
    };

    for (const key in mapped) {
      if (!isString(mapped[key])) {
        throw new Error(`field ${key} has invalid type`);
      }
    }

    return mapped;
  }

  toLoginData(item: any): ILoginData {
    if (isNullish(item)) {
      throw new Error("item is required");
    }

    const mapped: any = {
      email: item.email,
      password: item.password,
    };

    for (const key in mapped) {
      if (!isString(mapped[key])) {
        throw new Error(`field ${key} has invalid type`);
      }
    }

    return mapped;
  }
}
