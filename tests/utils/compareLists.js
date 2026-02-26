// tests/utils/compareLists.js
function difference(a, b) {
  const setB = new Set(b);
  return a.filter(x => !setB.has(x));
}

function sortNormalize(list) {
  return [...list].map(s => String(s).trim()).sort((x,y) => x.localeCompare(y));
}

module.exports = { difference, sortNormalize };