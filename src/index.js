import { initialCards } from "./components/cards.js";

import {
  clickOutsideHandler,
  closeModal,
  keyClickClose,
  openModal
} from "./components/modal.js";
import "./index.css";

import {enableValidation} from "./components/validation.js";

import { createCard, likeBtn, delElement } from "./components/card.js";
import { data } from "autoprefixer";

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

const newCard = (name, link) => {
  fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
    method:'POST',
    headers: {
      authorization: 'e5e5de72-de46-4c51-be74-1878519f8c80',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(handleResponse)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
}

//Добавление новой карточки
function addCardNew(evt, placesList) {
  evt.preventDefault();
  newCard(nameInputCard.value, descInputCard.value)

  const newCardElement = createCard(
    nameInputCard.value,
    descInputCard.value,
    likeBtn,
    delElement,
    openCard,
    cardId
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

//ВЫЗЫВАЕМ ФУНКЦИЮ ДОБАВЛЕНИЯ ОШИБКИ К ФОРМАМ
enableValidation();



const handleResponse = (response) => {
  console.log(response)
  return response.json();
};

const updateUserInfo = (userData) => {
  const { name, about, avatar } = userData;
  document.querySelector('.profile__title').textContent = name;
  document.querySelector('.profile__description').textContent = about;
  document.querySelector('.profile__image').style.backgroundImage = avatar;
};


const getData = () => {
  fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
    method: 'GET',
    headers: {
      authorization: 'e5e5de72-de46-4c51-be74-1878519f8c80',
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse)

  .then((data) => {
    updateUserInfo(data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
};

getData();


const updateCards = (cardsData) => {
  const cardsContainer = document.querySelector('.places__list');

  cardsData.forEach(card => {
    const { name, link, likes, _id } = card;
    const cardElement = createCard(name, link, likeBtn, delElement, openCard, likes, _id);
    cardsContainer.appendChild(cardElement);
  });
};




export const getCards = () => {
  fetch ('https://nomoreparties.co/v1/wff-cohort-12/cards ',{
    method: 'GET',
    headers: {
      authorization: 'e5e5de72-de46-4c51-be74-1878519f8c80',
      'Content-Type': 'application/json'
    }
  })

  .then(handleResponse)
  .then((data) => {
    updateCards(data);
    console.log(data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
}

getCards();

const editProfile = () =>{
  fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me',{
  method: 'PATCH',
  headers: {
    authorization: 'e5e5de72-de46-4c51-be74-1878519f8c80',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Mario',
    about: 'Kekovich'
  })
})

.then(handleResponse)
  .then((data) => {
    updateUserInfo(data);
    console.log(data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
}

editProfile();



//РЕДАКТИРОВАНИЕ АВАТАРА
const avatarEdit = () =>{
  fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me',{
  method:'PATCH',
  headers:{
    authorization: 'e5e5de72-de46-4c51-be74-1878519f8c80',
    'Content-Type': 'application/json'},
    body: JSON.stringify({
      avatar:avatar,
    })

    .then(handleResponse)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  })
})}
