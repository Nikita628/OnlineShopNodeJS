import { config } from "../../config";
import { IEmail } from "../../models/email";
import { IEmailFactory } from "../contracts/email/email-factory";
import { passwordReset, signupSuccess } from "./templates";

export class EmailFactory implements IEmailFactory {
  public createSignupSuccessEmail(param: { to: string; name: string }): IEmail {
    return {
      from: config.emailSettings.user,
      to: param.to,
      html: signupSuccess`${param.name}`,
      subject: "Successful Signup",
    };
  }

  public createPasswordResetEmail(param: { to: string, token: string }): IEmail {
    return {
      to: param.to,
      from: config.emailSettings.user,
      html: passwordReset`${param.token}`,
      subject: "Password Reset",
    };
  }
}
