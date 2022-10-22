import { isNullish } from "../utils/checks";

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
    if (isNullish(item)) {
      throw new Error('item is required');
    }

    return {
      email: item.email,
      password: item.password,
      name: item.name,
      passwordConfirmation: item.passwordConfirmation,
    };
  },
  toLoginData(item: any): ILoginData {
    return {
      email: item.email ?? "",
      password: item.password ?? "",
    };
  },
};
