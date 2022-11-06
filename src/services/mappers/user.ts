import { IUserNoSqlDbModel } from "../../database/contracts/user";
import { IUser } from "../../models/user";
import { IUserMapper } from "../contracts/mappers/user-mapper";

export class UserMapper implements IUserMapper {
  toModelFromNoSqlDbModel(item: IUserNoSqlDbModel): IUser {
    return {
      email: item.email,
      id: item._id.toString(),
      name: item.name,
    };
  }
}
