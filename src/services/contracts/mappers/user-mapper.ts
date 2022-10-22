import { IUserNoSqlDbModel } from "../../../database/contracts/user";
import { IUser } from "../../../models/user";

export interface IUserMapper {
  toModelFromNoSqlDbModel(item: IUserNoSqlDbModel): IUser;
}
