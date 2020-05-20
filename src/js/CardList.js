export default class CardList {
  constructor(container, array, func, api) {
    this.container = container;
    this.array = array;
    this.func = func;
    this.api = api;
  }

  addCard(title, link) {
    const template = this.func(title, link);
    this.container.appendChild(template);
  }

  // render() {
  //   for (const elem of this.array) {
  //     this.addCard(elem.title, elem.link);
  //   }
  // }

  updateRender () {
    this.api
      .getCards()
      .then((res) => {

        if (res) {
          res.forEach(card => {
            this.addCard(
              card.name,
              card.link)
          })
        } else {
          console.log('Ошибка: данные не найдены!');
        }
      })
      .catch(err => {

        console.log('Ошибка: ' + err);
      });
  }
}
