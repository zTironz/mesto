export default class Card {
  constructor() {
    this.card = null;
  }

  create(title, link) {
    this.card = document.createElement("div");
    this.card.classList.add("place-card");

    this.card.insertAdjacentHTML(
      "beforeend",
      `<div class="place-card__image" style="background-image: url(${link})">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name">${title}</h3>
        <button class="place-card__like-icon"></button>
      </div>`
    );

    this.setEventListener();

    return this.card;
  }

  like(event) {
    if (event.target.classList.contains("place-card__like-icon")) {
      event.target.classList.toggle("place-card__like-icon_liked");
    }
  }

  remove(event) {
    event.target.removeEventListener("click", this.remove);
    event.target
      .closest(".place-card")
      .querySelector(".place-card__like-icon")
      .removeEventListener("click", this.like);
    event.target.closest(".place-card").remove();
  }

  setEventListener() {
    this.card
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    this.card
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.remove);
  }
}
