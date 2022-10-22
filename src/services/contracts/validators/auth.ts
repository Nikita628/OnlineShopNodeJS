import { ISignupData } from "../../../models/auth";
import { AggregatedError } from "../../../models/utils/aggregated-error";

export interface IAuthValidator {
  signup(data: ISignupData): AggregatedError;
}
