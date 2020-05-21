import Popup from './Popup';
export default class PopupPicture extends Popup  {
  constructor(popup, popupImage, picture) {
    super(popup);
    this.popupImage = popupImage;
    this.picture = picture;
    this.open = this.open.bind(this);
  }

  open(event) {
    if (event.target.classList.contains("place-card__image")) {
      this.popupImage.classList.add("popup_is-opened");
      const imageBackground = event.target.style.backgroundImage;
      this.picture.style.backgroundImage = imageBackground;
    }
    this.addListeners();
  }

  addListeners() {
    this.popup
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
  }
  removeListeners() {
    this.popup
      .querySelector(".popup__close")
      .removeEventListener("click", this.close);
  }
}
