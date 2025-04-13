class Api {
  constructor({ baseURL }) {
    this._baseURL = baseURL;
  }

  async getInitialCards(path, token) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  async addNewCard(path, token, { title: cardName, link: cardLink }) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${cardName}`,
          link: `${cardLink}`,
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

  async like(path, token) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  async dislike(path, token) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  async deleteCard(path, token) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 204) {
        throw new Error(`${res.status} - ${res.type}`);
      }

      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserInfo(path, token) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  async updateUserInfo(path, token, { name: userName, about: userAbout }) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${userName}`,
          about: `${userAbout}`,
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

  async updateUserAvatar(path, token, picture) {
    try {
      const res = await fetch(`${this._baseURL}${path}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: `${picture}` }),
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

export const client = new Api({
  baseURL: 'http://localhost:3000',
});
