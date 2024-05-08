
// Импорт необходимых функций и стилей
import { initialCards } from "./components/cards.js";
import {
  clickOutsideHandler,
  closeModal,
  keyClickClose,
  openModal,
} from "./components/modal.js";
import "./index.css";
import { enableValidation } from "./components/validation.js";
import { createCard, likeBtn, delElement } from "./components/card.js";
import { data } from "autoprefixer";

// Выбор DOM-элементов
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

// Обработчик события для добавления новой карточки
formCard.addEventListener("submit", (evt) => addCardNew(evt, placesList));

// Обработчик события для открытия попапа с данными для редактирования
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

// Обработчики событий для открытия и закрытия попапов
const popAddClose = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const popEditClose = document.querySelector(".popup_type_edit .popup__close");
addButton.addEventListener("click", () => openModal(addCard));
editBtn.addEventListener("click", () => openModal(editPopUp));
popAddClose.addEventListener("click", () => closeModal(addCard));
popEditClose.addEventListener("click", () => closeModal(editPopUp));
document.addEventListener("click", clickOutsideHandler);

// Обработчик события для закрытия попапа с изображением
const imgClose = document.querySelector(".popup_type_image .popup__close");
imgClose.addEventListener("click", () => {
  closeModal(popImg);
});

// Функция для добавления новой карточки
const newCard = (name, link) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-12/cards", {
    method: "POST",
    headers: {
      authorization: "e5e5de72-de46-4c51-be74-1878519f8c80",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(handleResponse)
    .then((data) => {
      return data; // Возвращаем данные о добавленной карточке
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
    });
};

// Функция для обработки добавления новой карточки
function addCardNew(evt, placesList) {
  evt.preventDefault();
  newCard(nameInputCard.value, descInputCard.value)
    .then((data) => {
      const newCardElement = createCard(
        nameInputCard.value,
        descInputCard.value,
        likeBtn,
        delElement,
        openCard,
        [], // Передаем пустой массив лайков для новой карточки
        data._id // Передаем идентификатор новой карточки
      );

      placesList.insertBefore(newCardElement, placesList.firstChild);

      nameInputCard.value = "";
      descInputCard.value = "";

      closeModal(addCard);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении новой карточки:", error);
    });
}

// Функция для открытия карточки
export function openCard(evt) {
  const cardImg = evt.target;
  const imgDesp =
    cardImg.parentElement.querySelector(".card__title").textContent;
  popUpImg.src = cardImg.src;
  popUpImg.alt = imgDesp;
  popCaption.textContent = imgDesp;
  openModal(popImg);
}

// Вызов функции для включения валидации форм
enableValidation();

// Функция для обработки ответа от API
const handleResponse = (response) => {
  return response.json();
};

// Функция для обновления карточек
const updateCards = (cardsData) => {
  const cardsContainer = document.querySelector(".places__list");

  cardsData.forEach((card) => {
    const { name, link, likes, _id } = card;
    const cardElement = createCard(
      name,
      link,
      likeBtn,
      delElement,
      openCard,
      likes,
      _id
    );
    cardsContainer.appendChild(cardElement);
  });
};

// Функция для получения карточек с сервера
export const getCards = () => {
  fetch("https://nomoreparties.co/v1/wff-cohort-12/cards ", {
    method: "GET",
    headers: {
      authorization: "e5e5de72-de46-4c51-be74-1878519f8c80",
      "Content-Type": "application/json",
    },
  })
    .then(handleResponse)
    .then((data) => {
      updateCards(data);
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
    });
};

getCards();

// Функция для обработки запросов к API
const baseUrl = "https://nomoreparties.co/v1/wff-cohort-12";
const headers = {
  authorization: "276ad100-5acb-4462-bd4c-2c97ced4dc2a",
  "Content-Type": "application/json",
};

const apiMethod = (apiRequest) => {
  return fetch(`${baseUrl}/${apiRequest.url}`, {
    method: `${apiRequest.method}`,
    headers: headers,
    body: JSON.stringify(apiRequest.body),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
};

// Функция для обновления аватара
const updateAvatarOnServer = (avatar) =>
  apiMethod({
    url: "users/me/avatar",
    method: "PATCH",
    body: { avatar: avatar },
  });
// Получаем элементы DOM
const profImg = document.querySelector(".profile__image"); // Изображение профиля
const popupUpdateAvatar = document.querySelector(".popup_type_update_avatar"); // Попап для обновления аватара
const formUpdateAvatar = document.forms["update-avatar"]; // Форма для обновления аватара
const inputUpdateAvatar = formUpdateAvatar.elements["link"]; // Поле ввода ссылки на аватар
const avatarCloseModal = document.querySelector(
  ".popup_type_update_avatar .popup__close"
); // Кнопка закрытия попапа для обновления аватара

// Обработчик события для открытия попапа при клике на изображение профиля
profImg.addEventListener("click", () => {
  profImg.classList.add("clicked");
  inputUpdateAvatar.value = "";
  openModal(popupUpdateAvatar);
});

// Обработчик события для удаления класса при уводе курсора с изображения профиля
profImg.addEventListener("mouseout", () => profImg.classList.remove("clicked"));

// Обработчик события для закрытия попапа при клике на кнопку закрытия
avatarCloseModal.addEventListener("click", () => closeModal(popupUpdateAvatar));

// Обработчик события для отправки формы обновления аватара
formUpdateAvatar.addEventListener("submit", (evt) =>
  submitUpdateAvatar(evt, inputUpdateAvatar.value)
);

// Функция для отправки запроса на обновление аватара
function submitUpdateAvatar(evt, avatar) {
  evt.preventDefault();
  updateAvatarOnServer(avatar)
    .then((data) => {
      profImg.style.backgroundImage = `url(${data.avatar})`;
      console.log("Ссылка на новый аватар:", data.avatar);
      closeModal(popupUpdateAvatar);
    })
    .catch((error) => console.log("Ошибка при обновлении аватара:", error));
   
    

  closeModal(popupUpdateAvatar);
}


// РЕДАКТИРОВАНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ


// Функция для редактирования профиля
const editProfile = (userData) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-12/users/me", {
    method: "PATCH",
    headers: {
      authorization: "e5e5de72-de46-4c51-be74-1878519f8c80",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then(handleResponse)
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
      throw error;
    });
};

// Получаем элементы формы редактирования профиля
const formProfleElement = document.querySelector(
  ".popup_type_edit  .popup__form"
);
const nameInput = document.querySelector(".popup__input_type_name"); // Поле ввода имени
const jobInput = document.querySelector(".popup__input_type_description"); // Поле ввода информации о себе
const avatarInput = document.querySelector(".popup__input_type_url"); // Поле ввода ссылки на аватар


// Обновляем информацию о пользователе
const updateUserInfo = (userData) => {
  const { name, about, avatar } = userData;
  document.querySelector(".profile__title").textContent = name;
  document.querySelector(".profile__description").textContent = about;
  document.querySelector(".profile__image").src= avatar;
};

// Обработчик события отправки формы редактирования профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  // Получаем значения из формы
  const newName = nameInput.value;
  const newAbout = jobInput.value;
  const newAvatar = avatarInput.value;

  // Отправляем изменения на сервер
  editProfile({ name: newName, about: newAbout, avatar: newAvatar })
    .then((data) => {
      // Обновляем данные на клиенте
      updateUserInfo(data);
      console.log(data);
      closeModal(editPopUp);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
      // Обработка ошибки (например, вывод сообщения пользователю)
    });
}

// Получаем данные о пользователе с сервера
const getData = () => {
  fetch("https://nomoreparties.co/v1/wff-cohort-12/users/me", {
    method: "GET",
    headers: {
      authorization: "e5e5de72-de46-4c51-be74-1878519f8c80",
      "Content-Type": "application/json",
    },
  })
    .then(handleResponse)
    .then((data) => {
      updateUserInfo(data); // Обновляем информацию о пользователе
      console.log(data);
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
    });
};

getData();


formProfleElement.addEventListener("submit", handleFormProfileSubmit);


