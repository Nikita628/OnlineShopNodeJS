import { Email } from "../../models/email";
import { IEmailService } from "../contracts/email-service";
import nodemailer from "nodemailer";
import { config } from "../../config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.emailSettings.user,
    clientId: config.emailSettings.clientId,
    clientSecret: config.emailSettings.clientSecret,
    refreshToken: config.emailSettings.refreshToken,
  },
});

export class EmailService implements IEmailService {
  public async send(email: Email): Promise<void> {
    transporter.sendMail(email, function (error, info) {
      if (error) {
        console.log("error sending email: ", error);
      } else {
        console.log("email sent: " + info.response);
      }
    });
  }
}
