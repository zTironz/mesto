export default class UserInfo {
  constructor(name, about, person, info, api, avatar, popupEdit) {
    this.name = name;
    this.about = about;
    this.person = person;
    this.info = info;
    this.api = api;
    this.avatar = avatar;
    this.popupEdit = popupEdit;
  }

  setUserInfo() {
    this.api
      .getUserInfo()
      .then((res) => {
        if (res) {
          this.name.textContent = res.name;
          this.about.textContent = res.about;
          this.avatar.style.backgroundImage = `url(${res.avatar})`;
        } else {
          console.log("Ошибка: данные не найдены!");
        }
      })
      .catch(err => {
        console.log("Ошибка: " + err);
      });
  }

  sendForm() {
    this.api
      .updateInfo(this.person.value, this.info.value)
      .then((res) => {
        if (res) {
          this.updateUserInfo(res);
          this.popupEdit.classList.remove("popup_is-opened");
        } else {
          console.log("Ошибка: данные не найдены!");
        }
      })
      .catch(err => {
        console.log("Ошибка: " + err);
      });
  }
  updateUserInfo(res) {
    this.name.textContent = res.name;
    this.about.textContent = res.about;
  }
}
