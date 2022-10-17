import { ISignupData, ILoginData } from "../models/auth";
import { IUser, userMapper } from "../models/user";
import { IAuthService } from "./contracts/auth-service";
import { Result } from "../models/utils/result";
import { UserModel } from "../database/nosql/models/user";
import { encryptionService } from ".";
import { IUserNoSqlDbModel } from "../database/contracts/user";
import { Error } from "../models/utils/error";

export class AuthService implements IAuthService {
  async signup(data: ISignupData): Promise<Result<IUser, Error>> {
    const user = await UserModel.findOne({ email: { $eq: data.email } });

    if (user) {
      return new Result({ error: new Error("user already exists") });
    }

    const createdUser = await UserModel.create({
      email: data.email,
      password: await encryptionService.hash(data.password),
      name: data.name,
      cart: {
        cartItems: [],
      },
    });

    return new Result({
      value: userMapper.toModelFromNoSqlDbModel(createdUser),
    });
  }

  async login(data: ILoginData): Promise<Result<IUser, Error>> {
    const user = await UserModel.findOne({ email: { $eq: data.email } });

    if (!user) {
      return new Result({
        error: new Error("incorrect login and or password"),
      });
    }

    if (!await this.isValidPassword(data.password, user)) {
      return new Result({
        error: new Error("incorrect login and or password"),
      });
    }

    return new Result({
      value: userMapper.toModelFromNoSqlDbModel(user),
    });
  }

  private isValidPassword(
    password: string,
    user: IUserNoSqlDbModel
  ): Promise<boolean> {
    return encryptionService.areEqual(password, user.password);
  }
}
