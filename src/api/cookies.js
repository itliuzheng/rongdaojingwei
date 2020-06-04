//import cookies from 'vue-cookies'

const TokenKey = 'Admin-Token'

export function getTokenStorage() {
  return sessionStorage.getItem(TokenKey)
}

export function setTokenStorage(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeTokenStorage() {
  return sessionStorage.removeItem(TokenKey)
}