export const everyEqual = (
  a: Record<string, unknown>,
  b: Record<string, unknown>
) => {
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
};
