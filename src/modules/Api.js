class Api {
  constructor(options) {
    this.options = options;
  }
  getInitialCards() {
    return fetch(this.options.baseUrl + "/cards", {
      headers: this.options.headers
    });
  }

  getUserInformation() {
    return fetch(this.options.baseUrl + "/users/me", {
      headers: this.options.headers
    });
  }
  saveUserInformation(newName, newAbout) {
    
    return fetch(this.options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    });
  }
  postNewCard(newName, newLink) {
    return fetch(this.options.baseUrl + "/cards", {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name: newName,
        link: newLink
      })
    });
  }
  deleteCard(idCard) {
      /** REVIEW: Можно лучше:
       * При использовании шаблонных строк можно обойтись без конкатенации
       * this.options.baseUrl +`/cards/${idCard}` > `${this.options.baseUrl}/cards/${idCard}`
      **/
      return fetch(`${this.options.baseUrl}/cards/${idCard}`, {
      method: "DELETE",
      headers: this.options.headers
    });
  }
  likeCard(idCard) {
    return fetch(this.options.baseUrl +`/cards/like/${idCard}`, {
      method: "PUT",
      headers: this.options.headers
    });
  }
  removeLikeCard(idCard) {
    return fetch(this.options.baseUrl +`/cards/like/${idCard}`, {
      method: "DELETE",
      headers: this.options.headers
    });
  }
  updateAvatar(link) {
    return fetch(this.options.baseUrl + `/users/me/avatar`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: link
      })
    });
  }
}
