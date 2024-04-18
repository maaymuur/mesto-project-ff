import { initialCards } from "./components/cards.js";

import {
  clickOutsideHandler,
  closeModal,
  keyClickClose,
  openModal,
} from "./components/modal.js";
import "./index.css";

import { createCard, likeBtn, delElement } from "./components/card.js";

const addButton = document.querySelector(".profile__add-button");
const editBtn = document.querySelector(".profile__edit-button");
const popCaption = document.querySelector(".popup__caption");
const placesList = document.querySelector(".places__list");
const popUpImg = document.querySelector(".popup__image");
const editPopUp = document.querySelector(".popup_type_edit");
const popImg = document.querySelector(".popup_type_image");
const addCard = document.querySelector(".popup_type_new-card");
const formCard = document.querySelector(".popup_type_new-card .popup__form");

const nameInputCard = document.querySelector(".popup__input_type_card-name");
const descInputCard = document.querySelector(".popup__input_type_url");

formCard.addEventListener("submit", (evt) => addCardNew(evt, placesList));
// formCard.addEventListener("submit", addCardNew);

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

const popAddClose = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const popEditClose = document.querySelector(".popup_type_edit .popup__close");

addButton.addEventListener("click", () => openModal(addCard));
editBtn.addEventListener("click", () => openModal(editPopUp));

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

//ЗАКРЫТИЕ КАРТИНКИ ПО КРЕСТИКУ
const imgClose = document.querySelector(".popup_type_image .popup__close");

imgClose.addEventListener("click", () => {
  closeModal(popImg);
});

//РЕДАКТИРОВАНИЕ ИМЕНИ И ИНФОРМАЦИИ О СЕБЕ
const formProfleElement = document.querySelector(
  ".popup_type_edit  .popup__form"
);
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  nameInput.value;
  jobInput.value;
  const profTitle = document.querySelector(".profile__title");
  const profJob = document.querySelector(".profile__description");

  profTitle.textContent = nameInput.value;
  profJob.textContent = jobInput.value;

  closeModal(editPopUp);
}

formProfleElement.addEventListener("submit", handleFormProfileSubmit);

//Добавление новой карточки
function addCardNew(evt, placesList) {
  evt.preventDefault();
  const newCard = {
    name: nameInputCard.value,
    link: descInputCard.value,
  };

  const newCardElement = createCard(
    newCard.name,
    newCard.link,
    likeBtn,
    delElement,
    openCard
  );

  placesList.insertBefore(newCardElement, placesList.firstChild);

  nameInputCard.value = "";
  descInputCard.value = "";

  closeModal(addCard);
}

//ОТКРЫТИЕ КАРТОЧЕК
export function openCard(evt) {
  const cardImg = evt.target;
  const imgDesp =
    cardImg.parentElement.querySelector(".card__title").textContent;
  popUpImg.src = cardImg.src;
  popUpImg.alt = imgDesp;
  popCaption.textContent = imgDesp;
  openModal(popImg);
}

//СОЗДАНИЕ КАРТОЧЕК
initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData.name,
    cardData.link,
    likeBtn,
    delElement,
    openCard
  );
  placesList.append(cardElement);
});
