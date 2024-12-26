export function makeQuery(query: string) {
  const queryString = query.slice(query.indexOf("?"));
  if (queryString) return {};
  return Object.fromEntries(
    new URLSearchParams(query.slice(query.indexOf("?")))
  );
}
