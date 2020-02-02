class PopupPlace extends Popup {
  constructor(container, validation, api) {
    super(container);
    this.validation = validation;
    this.api = api;
  }
  open(event) {
    if (event.target.classList.contains("user-info__button_place")) {
      this.container.classList.add("popup_is-opened");
      this.button.textContent = "+";
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
    const [name, link] = this.form.elements;

    this.button.textContent = "Загрузка..."
    this.api.postNewCard(name.value, link.value)

    .then(res => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(res.status);
    })
    .then(res=> {
      cardList.addCard(name.value, link.value, res._id);
      this.container.classList.remove("popup_is-opened");
    })
    .catch(err => {
      popErrors.openClose();
        document.querySelector(
          ".errors__text"
        ).textContent = `Произошла ошибка ${err}, простите`;
    })

  }
}
