export function normalizeEmptyStrings<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v === '' ? null : v])) as T
}
