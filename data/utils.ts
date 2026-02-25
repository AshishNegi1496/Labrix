/** Deeply freeze a value to enforce immutability at runtime. */
export function deepFreeze<T>(value: T): Readonly<T> {
  if (value && typeof value === "object") {
    Object.freeze(value);
    Object.getOwnPropertyNames(value).forEach((prop) => {
      const nested = (value as Record<string, unknown>)[prop];
      if (nested && typeof nested === "object" && !Object.isFrozen(nested)) {
        deepFreeze(nested);
      }
    });
  }
  return value as Readonly<T>;
}

/** Create a lazy-loaded accessor with caching. */
export function createLazy<T>(factory: () => Promise<T>) {
  let cached: T | null = null;
  let pending: Promise<T> | null = null;

  return async (): Promise<T> => {
    if (cached) return cached;
    if (pending) return pending;

    pending = factory().then((value) => {
      cached = value;
      pending = null;
      return value;
    });

    return pending;
  };
}
