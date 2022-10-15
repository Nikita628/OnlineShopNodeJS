import { IError } from "./error";

export class Result<T> {
  value?: T;
  error?: IError;

  constructor(init?: { value?: T; error?: IError }) {
    this.value = init?.value;
    this.error = init?.error;
  }
}
