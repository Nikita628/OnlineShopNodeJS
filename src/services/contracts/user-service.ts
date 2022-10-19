import { ISearchParam, IUser } from "../../models/user";
import { Result } from "../../models/utils/result";
import { Error } from '../../models/utils/error';

export interface IUserService {
  search(param: ISearchParam): Promise<IUser[]>;
  validateResetToken(token: string): Promise<Result<IUser, Error>>;
  setNewPassword(userId: string, password: string): Promise<void>;
}
