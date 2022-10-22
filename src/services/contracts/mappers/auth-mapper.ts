import { ILoginData, ISignupData } from "../../../models/auth";

export interface IAuthMapper {
  toSignupData(item: any): ISignupData;
  toLoginData(item: any): ILoginData;
}
