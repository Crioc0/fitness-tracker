export function normalizeEmptyStrings<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      v === '' ? null : v
    ])
  )
}
