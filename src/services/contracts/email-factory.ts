import { IEmail } from "../../models/email";

export interface IEmailFactory {
  createSignupSuccessEmail(param: { to: string, name: string }): IEmail;
  createPasswordResetEmail(param: {}): IEmail;
}
