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
    return {
      email: item.email,
      password: item.password,
      name: item.name,
    };
  },
  toLoginData(item: any): ILoginData {
    return {
      email: item.email,
      password: item.password,
    };
  },
};
