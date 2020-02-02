class Popup {
    constructor(container) {
      this.container = container;
      this.button = this.container.querySelector("button");
      this.form = this.container.querySelector("form");     
    }
    close(event) {
      if (event.target.classList.contains("popup__close")) {
        this.container.classList.remove("popup_is-opened");
      }
    }
    disableButton() {
      this.button.setAttribute("disabled", true);
    }
    removeErrors() {
      this.form.querySelectorAll(".popup__error").forEach(error => {
        error.textContent = "";
      });
    }
  }
  