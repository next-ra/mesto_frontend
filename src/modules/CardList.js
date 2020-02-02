export class CardList {
  constructor(container, card, api) {
    this.container = container;
    this.card = card;
    this.api = api;
  }
  addCard(name, link, idCard, likes, owner) {
    // при добавлении новой карточки консоль больше  не ругается на undefined
    if (likes === undefined) {
      likes = [];
    }
    const clone = this.card.create();
    clone.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url("${link}")`;
    clone.querySelector(".place-card__name").textContent = `${name}`;
    clone.querySelector(".place-card").setAttribute("id", `${idCard}`);
    clone.querySelector(".place-card__like-counter").textContent =
      `${likes.length}` || 0;

    // Если в лайках есть мой айди - то лайки рендерятся
    likes.find(like => {
      if (like._id === "28a88090436fe2d20863f5bb") {
        clone
          .querySelector(".place-card__like-icon")
          .classList.add("place-card__like-icon_liked");
      }
    });
    /** REVIEW: Отлично:
     *   Есть проверка, что карточку может удалять только владелец
     **/
    // На моих карточках отображаем корзину и при добавлении новой карточки теперь тоже отображается
    if (owner === "28a88090436fe2d20863f5bb" || owner === undefined) {
      clone
        .querySelector(".place-card__delete-icon")
        .removeAttribute("disabled");
    }
    this.container.appendChild(clone);
  }
  render() {
    this.api
      .getInitialCards()
      .then(res => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(res.status);
      })

      .then(res => {
        res.forEach(card => {
          // console.log(res)
          // проверка на владельца, кто-то заспамил карточками с колбасой весь сервер )))
          // а потом еще кто-то загрузил почти 7000 карточек на сервер
          // над объектом с данными еще подумаю
          if (card.owner._id === `28a88090436fe2d20863f5bb`) { 
            this.addCard(
              card.name,
              card.link,
              card._id,
              card.likes,
              card.owner._id
            );
          }
        });
      })
      .catch(err => {
        popErrors.openClose();
        document.querySelector(
          ".errors__text"
        ).textContent = `Произошла ошибка ${err}`;
        
      });
  }
}
