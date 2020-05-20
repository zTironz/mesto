export default class Api {
  // Отлично!: Параметры api передаются в конструкторе, а не дублируются в каждом запросе.
  constructor(options) {
      this.baseUrl = options.baseUrl;
      // Можно лучше: Неиспользуемые переменные key и options.
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

  // Отлично!: В метод передаются простые текстовые значения.
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
  // Отлично!: Проверка статуса вынесена в отдельную функцию и повторно используется.
    checkStatus(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

      }
  // Отлично!: Показ ошибки вынесен в отдельную функцию и используется во всех вызовах к api.
    showError(err) {
        return console.log(err);
      }

}

