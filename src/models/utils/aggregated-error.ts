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

  public static from(
    errors: { [key: string]: string[] },
    message: string = "Something went wrong"
  ): AggregatedError {
    const aggregatedError = new AggregatedError();
    aggregatedError.message = message;

    for (const key in errors) {
      aggregatedError.errors[key] = errors[key][0];
    }

    return aggregatedError;
  }
}
