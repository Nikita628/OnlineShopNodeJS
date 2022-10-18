import { Email } from "../../models/email";

export interface IEmailService {
  send(email: Email): Promise<void>;
}
