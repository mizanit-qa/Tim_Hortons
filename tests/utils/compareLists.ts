export function difference<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((x) => !setB.has(x));
}

export function sortNormalize(list: (string | number)[]): string[] {
  return [...list].map((s) => String(s).trim()).sort((x, y) => x.localeCompare(y));
}
