export class Result<ValueType, ErrorType> {
  value?: ValueType;
  error?: ErrorType;

  constructor(init?: { value?: ValueType; error?: ErrorType }) {
    this.value = init?.value;
    this.error = init?.error;
  }
}
