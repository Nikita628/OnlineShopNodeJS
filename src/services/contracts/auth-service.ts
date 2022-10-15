import { ILoginData, ISignupData } from "../../models/auth";
import { IUser } from "../../models/user";
import { Result } from "../../models/utils/result";

export interface IAuthService {
  signup(data: ISignupData): Promise<Result<IUser>>;
  login(data: ILoginData): Promise<Result<IUser>>;
}
