import settings from './settings';

const storage = window.localStorage;

const tokenKey = settings.storageTokenKey;

export function setToken(token : string) {
  if (token) storage.setItem(tokenKey, token);
}
export function getToken() {
  return storage.getItem(tokenKey) || null;
}
