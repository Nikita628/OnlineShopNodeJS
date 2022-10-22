export class AggregatedError {
  public message?: string;
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
}
