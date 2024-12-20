export const updateFields = <T extends object>(
  target: T,
  source: Partial<T>,
): void =>
  (Object.keys(source) as (keyof T)[]).forEach((key) => {
    if (key in target && source[key] !== undefined) target[key] = source[key];
  });
