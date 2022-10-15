import { ISignupData, ILoginData } from "../models/auth";
import { IUser } from "../models/user";
import { IAuthService } from "./contracts/auth-service";
import { Result } from "../models/utils/result";

export class AuthService implements IAuthService {
  async signup(data: ISignupData): Promise<Result<IUser>> {
    throw new Error("Method not implemented.");
  }
  async login(data: ILoginData): Promise<Result<IUser>> {
    throw new Error("Method not implemented.");
  }
}
