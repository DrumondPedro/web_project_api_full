export default class LocalData {
  constructor({ TOKEN_KEY }) {
    this.TOKEN_KEY = TOKEN_KEY;
  }

  set(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  get() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  remove() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
