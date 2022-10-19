import { ILoginData, ISignupData } from "../../models/auth";
import { IUser } from "../../models/user";
import { Error } from "../../models/utils/error";
import { Result } from "../../models/utils/result";

export interface IAuthService {
  signup(data: ISignupData): Promise<Result<IUser, Error>>;
  login(data: ILoginData): Promise<Result<IUser, Error>>;
  resetPassword(email: string): Promise<Result<boolean, Error>>;
}
