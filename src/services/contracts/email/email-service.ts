import { IEmail } from "../../../models/email";

export interface IEmailService {
  send(email: IEmail): Promise<void>;
}
