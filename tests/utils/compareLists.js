export function difference(a, b) {
  const setB = new Set(b);
  return a.filter((x) => !setB.has(x));
}

export function sortNormalize(list) {
  return [...list].map((s) => String(s).trim()).sort((x, y) => x.localeCompare(y));
}
