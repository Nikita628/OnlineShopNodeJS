export function isNullish(val: any) {
  return val === null || val === undefined;
}

export function isString(val: any) {
  return typeof val === 'string';
}

export function isNumber(val: any) {
  return Number.isFinite(val);
}