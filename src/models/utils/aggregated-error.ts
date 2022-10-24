export class AggregatedError {
  public message?: string;
  /** stores errors in format { 'field name' : 'error message' } */
  public errors: Record<string, string> = {};

  constructor(message?: string) {
    this.message = message;
  }

  public toJson(): string {
    return JSON.stringify({
      message: this.message,
      errors: this.errors,
    });
  }

  public static from(param: { [key: string]: string[] }): AggregatedError {
    const aggregatedError = new AggregatedError();
    aggregatedError.message = "Something went wrong";

    for (const key in param) {
      aggregatedError.errors[key] = param[key][0];
    }

    return aggregatedError;
  }
}
