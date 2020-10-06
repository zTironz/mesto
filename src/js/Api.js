export default class Api {

  constructor(options) {
      this.baseUrl = options.baseUrl;

      this.key = options.headers.authorization;
      this.options = options;
      this.headers = options.headers;
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(this.checkStatus)
      .catch(this.showError);
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(this.checkStatus)
      .catch(this.showError);
  }

  updateInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    })
      .then(this.checkStatus)
      .catch(this.showError);
  }
  addNewCard(title, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res);
        })
        .catch((err) => Promise.reject(new Error(`Ошибка: ${err.message}`)));
  }

    checkStatus(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

      }
    showError(err) {
        return console.log(err);
      }

}

