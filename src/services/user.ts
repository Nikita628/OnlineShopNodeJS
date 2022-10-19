import { FilterQuery } from "mongoose";
import { encryptionService } from ".";
import { IUserNoSqlDbModel } from "../database/contracts/user";
import { UserModel } from "../database/nosql/models/user";
import { ISearchParam, IUser, userMapper } from "../models/user";
import { Error } from "../models/utils/error";
import { Result } from "../models/utils/result";
import { IUserService } from "./contracts/user-service";

export class UserService implements IUserService {
  public async setNewPassword(userId: string, password: string): Promise<void> {
    await UserModel.updateOne(
      { _id: { $eq: userId } },
      {
        password: await encryptionService.hash(password),
        resetToken: undefined,
        resetTokenExpiration: undefined,
      }
    );
  }

  public async validateResetToken(
    token: string
  ): Promise<Result<IUser, Error>> {
    const userFromDb = await UserModel.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!userFromDb) {
      return new Result({ error: new Error("token is invalid") });
    }

    return new Result({
      value: userMapper.toModelFromNoSqlDbModel(userFromDb),
    });
  }

  public async search(param: ISearchParam): Promise<IUser[]> {
    const filter: FilterQuery<IUserNoSqlDbModel> = {};

    if (param.resetToken) {
      filter.resetToken = param.resetToken;
    }

    const usersFromDb = await UserModel.find(filter);

    return usersFromDb.map(userMapper.toModelFromNoSqlDbModel);
  }
}
