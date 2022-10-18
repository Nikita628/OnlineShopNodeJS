import { Email } from "../../models/email";

export interface IEmailFactory {
  createSignupSuccessEmail(param: { to: string, name: string }): Email;
}
