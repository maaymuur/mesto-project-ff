// Импорт необходимых функций и стилей
import {
  clickOutsideHandler,
  closeModal,
  openModal,
} from "./components/modal.js";
import "./index.css";
import { enableValidation, clearValidation } from "./components/validation.js";
import { createCard, likeBtn, delElement } from "./components/card.js";
import {
  newCard,
  handleResponse,
  editProfile,
  updateAvatarOnServer,
  getData,
  getCards,
} from "./components/api.js";

let userId;

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
const nameElement = document.querySelector(".profile__title");
const descriptionElement = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);

// Вызов функции для включения валидации форм
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

// Вызов функции clearValidation при открытии формы профиля
editBtn.addEventListener("click", function () {
  const profileForm = document.querySelector(".popup_type_edit .popup__form");
  clearValidation(profileForm, {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  });
});

// Обработчик события для добавления новой карточки
formCard.addEventListener("submit", (evt) => addCardNew(evt, placesList));

// Обработчик события для открытия попапа с данными для редактирования
document.addEventListener("click", function (event) {
  if (event.target === editBtn) {
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

// Функция для обработки добавления новой карточки
function addCardNew(evt, placesList) {
  evt.preventDefault();

  const saveButton = formCard.querySelector(".popup__button");
  saveButton.textContent = "Создание...";

  newCard(nameInputCard.value, descInputCard.value)
    .then((data) => {
      const newCardElement = createCard(
        nameInputCard.value,
        descInputCard.value,
        likeBtn,
        delElement,
        openCard,
        [],
        data._id,
        true
      );

      placesList.insertBefore(newCardElement, placesList.firstChild);

      nameInputCard.value = "";
      descInputCard.value = "";

      closeModal(addCard);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении новой карточки:", error);
    })
    .finally(() => {
      saveButton.textContent = "Создать";
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

// Функция для обновления карточек
const updateCards = (cardsData) => {
  const cardsContainer = document.querySelector(".places__list");

  cardsData.forEach((card) => {
    const { name, link, likes, _id } = card;
    const isMine = card.owner._id === userId;
    const cardElement = createCard(
      name,
      link,
      likeBtn,
      delElement,
      openCard,
      likes,
      _id,
      isMine,
      userId //Идентификатор текущего пользователя
    );
    cardsContainer.appendChild(cardElement);
  });
};


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
  const saveButton = formUpdateAvatar.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";

  updateAvatarOnServer(avatar)
    .then((data) => {
      profImg.style.backgroundImage = `url(${data.avatar})`;
      console.log("Ссылка на новый аватар:", avatar);
      closeModal(popupUpdateAvatar);
    })
    .catch((error) => {
      console.log("Ошибка при обновлении аватара:", error);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });
}

// РЕДАКТИРОВАНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ

// Получаем элементы формы редактирования профиля
const formProfleElement = document.querySelector(
  ".popup_type_edit  .popup__form"
);
const jobInput = document.querySelector(".popup__input_type_description"); 
const avatarInput = document.querySelector(".popup__input_type_url"); 

// Обновляем информацию о пользователе
export const updateUserInfo = (userData) => {
  const { name, about, avatar } = userData;
  document.querySelector(".profile__title").textContent = name;
  document.querySelector(".profile__description").textContent = about;
  document.querySelector(".profile__image").style[
    "background-image"
  ] = `url("${avatar}")`;
};

// Обработчик события отправки формы редактирования профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  // Получаем значения из формы
  const newName = nameInput.value;
  const newAbout = jobInput.value;
  const newAvatar = avatarInput.value;

  const saveButton = formProfleElement.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";

  // Отправка изменений на сервер
  editProfile({ name: newName, about: newAbout, avatar: newAvatar })
    .then((data) => {
      // Обновление данных
      updateUserInfo(data);
      console.log(data);
      closeModal(editPopUp);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });
}

formProfleElement.addEventListener("submit", handleFormProfileSubmit);

const fetchDataAndUpdate = () => {
  Promise.all([getData(), getCards()])
    .then(([userData, cards]) => {
      userId = userData._id; // Получение userID из данных о пользователе и присваиваивание
      updateUserInfo(userData);
      updateCards(cards, userId); // Передача массива карточек и userId
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
    });
};
fetchDataAndUpdate();
