import { ISignupData, ILoginData } from "../models/auth";
import { IUser, userMapper } from "../models/user";
import { IAuthService } from "./contracts/auth-service";
import { Result } from "../models/utils/result";
import { UserModel } from "../database/nosql/models/user";
import { encryptionService } from ".";

export class AuthService implements IAuthService {
  async signup(data: ISignupData): Promise<Result<IUser>> {
    const user = await UserModel.findOne({ email: { $eq: data.email } });

    if (user) {
      return new Result({ error: { message: "user already exists" } });
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

  async login(data: ILoginData): Promise<Result<IUser>> {
    const user = await UserModel.findOne({ email: { $eq: data.email } });

    if (!user) {
      return new Result({
        error: { message: "incorrect login and or password" },
      });
    }

    const isValidPassword = await encryptionService.areEqual(
      data.password,
      user.password
    );

    if (!isValidPassword) {
      return new Result({
        error: { message: "incorrect login and or password" },
      });
    }

    return new Result({
      value: userMapper.toModelFromNoSqlDbModel(user),
    });
  }
}
