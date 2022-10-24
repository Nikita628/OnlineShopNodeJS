import { ISignupData } from "../../models/auth";
import { AggregatedError } from "../../models/utils/aggregated-error";
import { IAuthValidator } from "../contracts/validators/auth";
import Validator from "validatorjs";

const signupRules: Record<keyof ISignupData, string> = {
  email: "required|email",
  name: "required|min:2",
  password: "required|min:6",
  passwordConfirmation: "required|min:6",
};

export class AuthValidator implements IAuthValidator {
  onSignup(data: ISignupData): AggregatedError | null {
    const validation = new Validator(data, signupRules);

    if (validation.fails()) {
      // construct aggregate error
    }

    return null;
  }
}
