//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
export function closeModal(evt) {
  evt.classList.remove("popup_is-opened");
  removeEscapeEventListener();
}

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПОВ
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  addEscapeEventListener();
}

//ЗАКРЫТИЕ ВСЕХ ОКОН ПРИ КЛИКЕ НА ФОН
export function clickOutsideHandler(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
}

//ЗАКРЫТИЕ ВСЕХ ОКОН ПРИ КЛИКЕ НА ESCAPE
export function keyClickClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

// Функция для добавления обработчика события закрытия по нажатию на Escape
export function addEscapeEventListener() {
  document.addEventListener("keydown", keyClickClose);
}

// Функция для удаления обработчика события закрытия по нажатию на Escape
export function removeEscapeEventListener() {
  document.removeEventListener("keydown", keyClickClose);
}
