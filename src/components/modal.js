
import { createCard, delElement,  likeBtn } from "./cards.js";


export const addCard = document.querySelector(".popup_type_new-card");
export const popUpImg = document.querySelector(".popup__image");
export const popCaption = document.querySelector(".popup__caption");
export const editPopUp = document.querySelector(".popup_type_edit");
export const popImg = document.querySelector(".popup_type_image");
export const formCard = document.querySelector(
  ".popup_type_new-card .popup__form"
);
const nameInputCard = document.querySelector(
  ".popup__input_type_card-name"
);
const descInputCard = document.querySelector(".popup__input_type_url");

//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
export function closeModal(evt) {
  evt.classList.remove("popup_is-opened");
  removeEscapeEventListener();
}

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПОВ
export function openModal(btn, evt) {
  btn.addEventListener("click", () => {
    evt.classList.add("popup_is-opened");
    addEscapeEventListener();
  });
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


// ФУНКЦИЯ ОТКРЫТИЯ КАРТИНОК КАРТОЧЕК
export function openCard(evt) {
  document.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__image")) {
      const cardImg = evt.target;
      const imgDesp =
        cardImg.parentElement.querySelector(".card__title").textContent;
      popUpImg.src = cardImg.src;
      popCaption.textContent = imgDesp;
      popImg.classList.add("popup_is-opened");
    }
  });
}
export const formElement = document.querySelector(".popup_type_edit  .popup__form");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_description");

export function handleFormSubmit(evt) {
  evt.preventDefault();

  nameInput.value;
  jobInput.value;
  const profTitle = document.querySelector(".profile__title");
  const profJob = document.querySelector(".profile__description");

  profTitle.textContent = nameInput.value;
  profJob.textContent = jobInput.value;

  closeModal(editPopUp);
}

export function addCardNew(evt, placesList) {
  evt.preventDefault();
  const newCard = {
    name: nameInputCard.value,
    link: descInputCard.value,
  };

  const newCardElement = createCard(newCard.name, newCard.link, likeBtn, openCard, delElement);

  placesList.insertBefore(newCardElement, placesList.firstChild);

  nameInputCard.value = "";   ё
  descInputCard.value = "";

  closeModal(addCard);
}
