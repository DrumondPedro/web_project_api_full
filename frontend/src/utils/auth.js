const { VITE_BASE_URL, VITE_ENV } = import.meta.env;

class Auth {
  constructor({ baseURL }) {
    this._baseURL = baseURL;
  }

  async register(path, { email: userEmail, password: userPassword }) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `${userEmail}`,
          password: `${userPassword}`,
        }),
      });

      if (res.status !== 201) {
        throw new Error(`${res.status} - ${res.type}`);
      }

      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async authorize(path, { email: userEmail, password: userPassword }) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `${userEmail}`,
          password: `${userPassword}`,
        }),
      });

      if (res.status !== 200) {
        throw new Error(`${res.status} - ${res.type}`);
      }

      return res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new Auth({
  baseURL: `${
    VITE_ENV === 'production' ? VITE_BASE_URL : 'http://localhost:3000'
  }`,
});
