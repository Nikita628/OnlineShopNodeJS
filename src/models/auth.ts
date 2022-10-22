import { isNullish, isString } from "../utils/checks";

export interface ISignupData {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export const authMapper = {
  toSignupData(item: any): ISignupData {
    // precondition to make sure that the item is present
    if (isNullish(item)) {
      throw new Error("item is required");
    }

    const mapped: any = {
      email: item.email,
      password: item.password,
      name: item.name,
      passwordConfirmation: item.passwordConfirmation,
    };

    // postcondition to make sure that the result has valid shape
    for (const key in mapped) {
      if (!isString(mapped[key])) {
        throw new Error(`field ${key} has invalid type`);
      }
    }

    // later in the app we are sure that the object has correct share
    // can work with it safely
    return mapped;
  },
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
  },
};
