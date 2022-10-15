export interface ISignupData {
  email: string;
  password: string;
  name: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export const authMapper = {
  toSignupData(item: any): ISignupData {
    if (!item) {
      // should extend precondition here
      // will not do this to save time, but in real app that would be necessary
      throw new Error("item is invalid");
    }

    return {
      email: item.email,
      password: item.password,
      name: item.name,
    };
  },
  toLoginData(item: any): ILoginData {
    if (!item) {
      throw new Error("item is invalid");
    }

    return {
      email: item.email,
      password: item.password,
    };
  },
};
