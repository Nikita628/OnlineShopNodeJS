import { config } from "../../config";
import { Email } from "../../models/email";
import { IEmailFactory } from "../contracts/email-factory";

export class EmailFactory implements IEmailFactory {
  createSignupSuccessEmail(param: { to: string; name: string }): Email {
    return new Email({
      from: config.emailSettings.user,
      to: param.to,
      html: `<h1>Congratulations ${param.name}, you have successfully signed up!</h1>`,
      subject: "Successful Signup",
    });
  }
}
