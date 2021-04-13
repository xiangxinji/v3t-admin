const storage = window.localStorage;
const tokenKey = 'v3t-admin-token';
export function setToken(token : string) {
  if (token) storage.setItem(tokenKey, token);
}
export function getToken() {
  return storage.getItem(tokenKey) || null;
}
