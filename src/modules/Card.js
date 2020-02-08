import {popErrors} from '../index.js'
export class Card {
  constructor(template, api, popDelete) {
    this.template = template;
    this.popDelete = popDelete;
    this.api = api;
  }
  create() {
    return this.template.content.cloneNode(true);
  }
  like(event) {
    if (
      event.target.classList.contains("place-card__like-icon") &&
      !event.target.classList.contains("place-card__like-icon_liked")
    ) {
      const id = event.target.closest(".place-card").getAttribute("id");
      this.id = id;
      this.api
        .likeCard(id)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else return Promise.reject(res.status);
        })
        .then(res => {
          if (this.id === res._id) {
            event.target.classList.add("place-card__like-icon_liked");
            event.target.nextElementSibling.textContent = res.likes.length;
          }
        })
        .catch(err => {
          popErrors.openClose();
          document.querySelector(
            ".errors__text"
          ).textContent = `Произошла ошибка ${err}, нам очень жаль.`;
        });
    }
    if (event.target.classList.contains("place-card__like-icon_liked")) {
      const id = event.target.closest(".place-card").getAttribute("id");
      this.id = id;
      this.api
        .removeLikeCard(id)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else return Promise.reject(res.status);
        })
        .then(res => {
          if (this.id === res._id) {
            event.target.classList.remove("place-card__like-icon_liked");
            event.target.nextElementSibling.textContent = res.likes.length;
          }
        })
        .catch(err => {
          popErrors.openClose();
          document.querySelector(
            ".errors__text"
          ).textContent = `Произошла ошибка ${err}, нам очень жаль`;
        });
    }
  }
  remove(cardId, container) {
    this.api
      .deleteCard(cardId)
      .then(res => {
        if (res.ok) {
          container.remove();
          console.log("карточка удалена");
        } else return Promise.reject(res.status);
      })
      .catch(err => {
        popErrors.openClose();
        document.querySelector(
          ".errors__text"
        ).textContent = `Произошла ошибка ${err}, нам очень жаль`;
      });
  }
}
