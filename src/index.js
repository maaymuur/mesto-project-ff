import { createCard, delElement, initialCards, likeBtn } from "./components/cards.js";

import {
  addCard,
  clickOutsideHandler,
  closeModal,
  editPopUp,
  keyClickClose,
  openModal,
  popImg,
  formCard,
  openCard,
  addCardNew
} from "./components/modal.js";
import "./index.css";

const addButton = document.querySelector(".profile__add-button");
const editBtn = document.querySelector(".profile__edit-button");
const popCaption = document.querySelector(".popup__caption");
const placesList = document.querySelector('.places__list');


formCard.addEventListener("submit", (evt) => addCardNew(evt, placesList));
// formCard.addEventListener("submit", addCardNew);

//СОЗДАНИЕ КАРТОЧЕК
initialCards.forEach((cardData) => {
  const cardElement = createCard(
      cardData.name,
      cardData.link,
      likeBtn, 
      openCard,// Поменяли местами параметры
      delElement   // Поменяли местами параметры
  );

  placesList.append(cardElement);
});

//ОБРАБОТЧИК ОТКРЫТИЯ ПОПАПОВ
openModal(addButton, addCard);
openModal(editBtn, editPopUp);

//ОБРАБОТЧИК ОТКРЫТИЯ ПОПАПА РЕДАКТИРОВАНИЯ С ДАННЫМИ
document.addEventListener("click", function (event) {
  if (event.target === editBtn) {
    const nameElement = document.querySelector(".profile__title");
    const descriptionElement = document.querySelector(".profile__description");
    const nameInput = document.querySelector(".popup__input_type_name");
    const descriptionInput = document.querySelector(
      ".popup__input_type_description"
    );
    nameInput.value = nameElement.textContent;
    descriptionInput.value = descriptionElement.textContent;
  }
});

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА С КАРТОЧКОЙ

openCard();

const popAddClose = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const popEditClose = document.querySelector(".popup_type_edit .popup__close");

//ОБРАБОТЧИК ЗАКРЫТИЯ ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ ЧЕРЕЗ КРЕСТИК
popAddClose.addEventListener("click", () => {
  closeModal(addCard);
});

//ОБРАБОТЧИК ЗАКРЫТИЯ ОКНА РЕДАКТИРОВАНИЯ ЧЕРЕЗ КРЕСТИК
popEditClose.addEventListener("click", () => {
  closeModal(editPopUp);
});

//СЛУШАТЕЛЬ ФУНКЦИИ ЗАКРЫТИЯ ПОПАПОВ ПРИ КЛИКЕ НА ФОН
document.addEventListener("click", clickOutsideHandler);

// СЛУШАТЕЛЬ ЗАКРЫТИЯ ПОПАПА КЛИКОМ НА ESCAPE
document.addEventListener("keydown", keyClickClose);

//ЗАКРЫТИЕ КАРТИНКИ ПО КРЕСТИКУ
const imgClose = document.querySelector(".popup_type_image .popup__close");

imgClose.addEventListener("click", () => {
  closeModal(popImg);
});

//РЕДАКТИРОВАНИЕ ИМЕНИ И ИНФОРМАЦИИ О СЕБЕ
const formElement = document.querySelector(".popup_type_edit  .popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameInput.value;
  jobInput.value;
  const profTitle = document.querySelector(".profile__title");
  const profJob = document.querySelector(".profile__description");

  profTitle.textContent = nameInput.value;
  profJob.textContent = jobInput.value;

  closeModal(editPopUp);
}

formElement.addEventListener("submit", handleFormSubmit);


