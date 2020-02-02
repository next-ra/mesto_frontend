export class PopupEdit extends Popup {
  constructor(container, validation, api) {
    super(container);
    this.validation = validation;
    this.api = api;
  }
  open(event) {
    if (event.target.classList.contains("user-info__button_edit")) {
      this.container.classList.add("popup_is-opened");
      const [input1, input2] = this.form.elements;
      input1.value = document.querySelector(".user-info__name").textContent;
      input2.value = document.querySelector(".user-info__job").textContent;
      this.removeErrors();
      this.button.textContent = "Сохранить";
    }
  }
  close(event) {
    super.close(event);
  }
  submit(event) {
    event.preventDefault();

    const [input1, input2] = this.form.elements;
    this.api
      .saveUserInformation(input1.value, input2.value)
      .then((this.button.textContent = "Загрузка..."))
      .then(res => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(res.status);
      })
      .then(res => {
        if (res.name === input1.value && res.about === input2.value) {
           document.querySelector(".user-info__name").textContent = input1.value;
           document.querySelector(".user-info__job").textContent = input2.value;
           this.container.classList.remove("popup_is-opened");
        }
      })
      .catch(err => {
        {
          popErrors.openClose();
          document.querySelector(
            ".errors__text"
          ).textContent = `Что-то пошло не так...  ошибка ${err}`;
          
        }
      })
  }
}
