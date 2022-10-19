import { IUserNoSqlDbModel } from "../database/contracts/user";

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface ISearchParam {
  resetToken: string;
}

export const userMapper = {
  toModelFromNoSqlDbModel(item: IUserNoSqlDbModel): IUser {
    return {
      email: item.email,
      id: item._id.toString(),
      name: item.name,
    };
  },
};
