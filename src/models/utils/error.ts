export class Error {
  public message: string;

  constructor(message: string) {
    this.message = message;
  }

  public toJson(): string {
    return JSON.stringify({
      message: this.message,
    });
  }

  public static fromJson(json: string): Error {
    const parsed = JSON.parse(json);

    return new Error(parsed.message);
  }
}
