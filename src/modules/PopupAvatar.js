import {Popup} from './Popup.js';
import {popErrors} from '../index.js';
export class PopupAvatar extends Popup {
  constructor(conatiner, validation, api) {
    super(conatiner);
    this.validation = validation;
    this.api = api;
  }
  open(event) {
    if (event.target.classList.contains("user-info__photo")) {
      this.container.classList.add("popup_is-opened");
      this.button.textContent = "Сохранить"
      this.form.reset();
      this.disableButton();
      this.removeErrors();
    }
  }
  close(event) {
    super.close(event);
  }
  submit(event) {
    event.preventDefault();
    const [link] = this.form.elements;
    this.api
      .updateAvatar(link.value)
      .then((this.button.textContent = "Загрузка..."))
      .then(res => {
        if (res.ok) {
          document.querySelector(
            ".user-info__photo"
          ).style.backgroundImage = `url("${link.value}")`;
          console.log("Аватар успешно обновлен");
          this.container.classList.remove("popup_is-opened");
        } else return Promise.reject(res.status);
      })
      .catch(err => {
        popErrors.openClose();
        document.querySelector(
          ".errors__text"
        ).textContent = `Произошла ошибка ${err}, нам очень жаль`;
      })     
  }
}
