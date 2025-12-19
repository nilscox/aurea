export function assert(value: unknown, message?: string): asserts value {
  if (!value) {
    throw new Error(message ?? 'Assertion error');
  }
}

assert.defined = function <T>(value: T | null | undefined): T {
  assert(value !== null);
  assert(value !== undefined);

  return value;
};
