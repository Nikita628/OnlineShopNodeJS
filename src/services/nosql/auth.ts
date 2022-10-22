import { ISignupData, ILoginData } from "../../models/auth";
import { IUser } from "../../models/user";
import { IAuthService } from "../contracts/auth-service";
import { Result } from "../../models/utils/result";
import { UserModel } from "../../database/nosql/models/user";
import { emailFactory, emailService, encryptionService, userMapper } from "..";
import { IUserNoSqlDbModel } from "../../database/contracts/user";
import { Error } from "../../models/utils/error";
import { oneHourAsMs } from "../../utils/constants";

export class AuthService implements IAuthService {
  async resetPassword(email: string): Promise<Result<boolean, Error>> {
    const user = await UserModel.findOne({ email: { $eq: email } });

    if (!user) {
      return new Result({
        error: new Error("user does not exist"),
      });
    }

    user.resetToken = await encryptionService.generateToken();
    user.resetTokenExpiration = Date.now() + oneHourAsMs;
    await user.save();

    await this.sendPasswordResetEmail(email, user.resetToken);

    return new Result({ value: true });
  }

  async signup(data: ISignupData): Promise<Result<IUser, Error>> {
    const user = await UserModel.findOne({ email: { $eq: data.email } });

    if (user) {
      return new Result({ error: new Error("user already exists") });
    }

    const createdUser = await this.createUser(data);

    await this.sendSignupSuccessEmail(data);

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

    if (!(await this.isValidPassword(data.password, user))) {
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

  private async createUser(data: ISignupData): Promise<IUserNoSqlDbModel> {
    const createdUser = await UserModel.create({
      email: data.email,
      password: await encryptionService.hash(data.password),
      name: data.name,
      cart: {
        cartItems: [],
      },
    });

    return createdUser;
  }

  private async sendSignupSuccessEmail(data: ISignupData): Promise<void> {
    await emailService.send(
      emailFactory.createSignupSuccessEmail({
        to: data.email,
        name: data.name,
      })
    );
  }

  private async sendPasswordResetEmail(
    email: string,
    token: string
  ): Promise<void> {
    await emailService.send(
      emailFactory.createPasswordResetEmail({
        to: email,
        token,
      })
    );
  }
}
