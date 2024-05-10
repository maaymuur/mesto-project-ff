import { hideError } from "./validation";

// Функция для закрытия попапа
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  removeEscapeEventListener();
}

// Функция для открытия попапа
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  addEscapeEventListener();
}

// Функция для обработки клика вне попапа
export function clickOutsideHandler(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
}

// Функция для обработки нажатия клавиши Escape
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

