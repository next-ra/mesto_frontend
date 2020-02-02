class PopupDelete {
  open(event) {
    if (event.target.classList.contains("place-card__delete-icon")) {
      const cardId = event.target.closest(".place-card").getAttribute("id");
      document.getElementById("popup-delete").classList.add("popup_is-opened");
      this.cardId = cardId;
      
      const container = event.target.closest(".place-card");
      this.container = container;
      this.choice(event);
    }
  }
  close() {
    document.getElementById("popup-delete").classList.remove("popup_is-opened");
  }
  choice(event) {
    if (event.target === document.getElementById('yes')) {
      card.remove(this.cardId, this.container);
      this.close();
    } 
  }
}

