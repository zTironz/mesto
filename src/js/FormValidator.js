import {validationErrors} from './validationErrors'; 
export default class FormValidator {
  constructor(form, validationErrors) {
    this.form = form;
    this.validationErrors = validationErrors;
    this.checkInputValidity = this.checkInputValidity.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.formInputs = Array.from(this.form.querySelectorAll("input"));
  }

  checkInputValidity(inputElement) {
    if (inputElement.validity.valueMissing) {
      inputElement.nextElementSibling.textContent = validationErrors.noValue;
      return false;
    }
    if (
      (inputElement.validity.tooShort || inputElement.validity.range) &&
      inputElement.type === "text"
    ) {
      inputElement.nextElementSibling.textContent = validationErrors.range;
      return false;
    }
 
    if (!inputElement.validity.valid && inputElement.type === "url") {
      inputElement.nextElementSibling.textContent = validationErrors.link;
      return false;
    }
    inputElement.nextElementSibling.textContent = "";
    return true;
  }

  setSubmitButtonState() {
    let isValid = true;

    this.formInputs.forEach((elem) => {
      if (!this.checkInputValidity(elem)) {
        isValid = false;
      }
    });

    if (isValid === true) {
      this.form.submit.classList.remove("popup__button_disabled");
      this.form.submit.removeAttribute("disabled");
    } else {
      this.form.submit.classList.add("popup__button_disabled");
      this.form.submit.setAttribute("disabled", true);
    }
  }

  setEventListeners() {
    this.form.addEventListener("input", () => {
      this.setSubmitButtonState();
    });
  }
}
