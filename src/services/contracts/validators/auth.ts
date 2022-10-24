import { ISignupData } from "../../../models/auth";
import { AggregatedError } from "../../../models/utils/aggregated-error";

export interface IAuthValidator {
  onSignup(data: ISignupData): AggregatedError | null;
}
