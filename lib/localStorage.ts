export function getLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  return null;
}

export function setLocalStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

//erase localStorage
export function eraseLocalStorage(key: string) {
  localStorage.removeItem(key);
}
