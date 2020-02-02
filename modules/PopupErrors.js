class PopupErrors {
    openClose(){
        document.getElementById('popup-errors').classList.toggle('popup_is-opened')
    }
   close(event) {
       if (event.target.classList.contains('popup__close_errors')) {
           this.openClose()
       }
   }
}