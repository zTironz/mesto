import "./style.css";
import UserInfo from './js/UserInfo';
import {initialCards} from './js/initialCards';
import Api from './js/Api';
import Card from './js/Card';
import CardList from './js/CardList';
import Popup from './js/Popup';
import PopupPicture from './js/PopupPicture';
import FormValidator from './js/FormValidator';

/* Переменные */

function resetErr() {
    const { person, info } = formEdit.elements;
    const errorName = document.querySelector("#error-name");
    const errorAbout = document.querySelector("#error-about");
    const buttonEdit = document.querySelector(".popup__button_type_new");
    errorName.textContent = "";
    errorAbout.textContent = "";
    person.value = name.textContent;
    info.value = about.textContent;
    buttonEdit.classList.remove("popup__button_disabled");
    buttonEdit.removeAttribute("disabled");
  }
  
  // function createCard(event) {
  // event.preventDefault();
  //   const formCard = document.forms.new;
  //   const button = document.querySelector(".popup__button");
  //   const { title, link } = formCard.elements;
  //   event.preventDefault();
  //   cardList.addCard(title.value, link.value);
  //   formCard.reset();
  //   popupNew.classList.remove("popup_is-opened");
  //   button.classList.add("popup__button_disabled");
  //   button.setAttribute("disabled", true);
  // }
function createCard(event) {
  event.preventDefault();
  const button = document.querySelector(".popup__button");
  button.classList.add("popup__button_type_new");
  button.textContent = "Загрузка...";

  api
      .addNewCard(formCard.elements.title.value, formCard.elements.link.value)

      .then(() => {
        cardList.addCard(title.value, link.value);
      })
      .catch(function (err) {
        console.log(err);
      })

      .finally(function () {
        formCard.reset();
        popupNew.classList.remove("popup_is-opened");

        button.classList.add("popup__button_disabled");
        button.setAttribute("disabled", true);

        button.classList.remove("popup__button_type_new");
        button.textContent = "+";
      });
}



  
  // Можно лучше: Неиспользуемая переменные card.
  const card = () => new Card();
  const newCard = (name, link) => {
    const card = new Card();
    return card.create(name, link);
  };
  
  const popupEdit = document.querySelector(".popup-edit");
  const editPopup = new Popup(popupEdit);
  
  const popupNew = document.querySelector(".popup-newCard");
  const addCardPopup = new Popup(popupNew);
  
  const popupImage = document.querySelector("#popup-picture");
  const picture = document.querySelector(".popup__content_image");
  const popupPicture = document.querySelector(".popup-picture");
  const picturePopup = new PopupPicture(popupPicture, popupImage, picture);
  
  const formEdit = document.forms.edit;
  const userValid = new FormValidator(formEdit);
  
  const formCard = document.forms.new;
  const cardValid= new FormValidator(formCard);
  
  /* Слушатели */
  
  cardValid.setEventListeners();
  userValid.setEventListeners();
  formCard.addEventListener("submit", createCard);
  
  const userInfoButton = document.querySelector(".user-info__button");
  userInfoButton.addEventListener("click", addCardPopup.open);
  
  const userInfoEdit = document.querySelector(".user-info__edit");
  userInfoEdit.addEventListener("click", editPopup.open);
  userInfoEdit.addEventListener("click", resetErr);
  
  const placesList = document.querySelector(".places-list");
  placesList.addEventListener("click", picturePopup.open);

  const avatar = document.querySelector('.user-info__photo');
  const api = new Api({
    baseUrl: 'https://nomoreparties.co/cohort10',
    headers: {
      authorization: 'ad968f0f-a2aa-4806-b662-e265b9c0a30a',
      'Content-Type': 'application/json'
    }
  });

  const cardList = new CardList(placesList, initialCards, newCard, api);
  
  const name = document.querySelector(".user-info__name");
  const about = document.querySelector(".user-info__job");

  const userInfo = new UserInfo(name, about, person, info, api, avatar, popupEdit);
  

  // function editProfile(event) {
  //   event.preventDefault();
  //   userInfo.sendForm();
  // }
function editProfile(event) {
  event.preventDefault();
  userInfo.sendForm();
  const buttonEdit = document.querySelector(".popup__button_type_new");
  const { person, info } = formEdit.elements;
  buttonEdit.textContent = "Загрузка...";

  api
      .updateInfo(formEdit.elements.person.value, formEdit.elements.info.value)

      .then(() => {
        userInfo.setUserInfo;
        userInfo.updateUserInfo;
      })

      .catch(function (err) {
        console.log(err);
      })

      .finally(function () {
        buttonEdit.textContent = "Сохранить";
      });
}
  
  userInfo.setUserInfo();
  cardList.updateRender();
  formEdit.addEventListener("submit", editProfile);

  