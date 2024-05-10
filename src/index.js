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
const profImg = document.querySelector(".profile__image"); // Изображение профиля
const popupUpdateAvatar = document.querySelector(".popup_type_update_avatar"); // Попап для обновления аватара
const formUpdateAvatar = document.forms["update-avatar"]; // Форма для обновления аватара
const inputUpdateAvatar = formUpdateAvatar.elements["link"]; // Поле ввода ссылки на аватар
const avatarCloseModal = document.querySelector(
  ".popup_type_update_avatar .popup__close"
); // Кнопка закрытия попапа для обновления аватара
const profTitle = document.querySelector(".profile__title");
const profDescr = document.querySelector(".profile__description");

editBtn.addEventListener("click", () => {
  // Вставка данных в поля формы профиля
  nameInput.value = nameElement.textContent;
  descriptionInput.value = descriptionElement.textContent;

  // Сброс валидации формы
  const profileForm = document.querySelector(".popup_type_edit .popup__form");
  clearValidation(profileForm, {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  });

  openModal(editPopUp);
});

// Вызов функции для включения валидации форм
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

// Обработчик события для добавления новой карточки
formCard.addEventListener("submit", (evt) => addCardNew(evt, placesList));

// Обработчики событий для открытия и закрытия попапов
const popAddClose = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const popEditClose = document.querySelector(".popup_type_edit .popup__close");
addButton.addEventListener("click", () => {
  openModal(addCard);
  checkValidityAndToggleSubmitButton();
});

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
  const cardTitleElement = cardImg
    .closest(".card")
    .querySelector(".card__title");
  const imgDesp = cardTitleElement.textContent;
  popUpImg.src = cardImg.src;
  popUpImg.alt = imgDesp;
  popCaption.textContent = imgDesp;
  openModal(popImg);
}

// Функция для проверки валидности данных в инпутах попапа
function checkValidityAndToggleSubmitButton() {
  // Получение инпутов и кнопки сабмита
  const inputs = formCard.querySelectorAll(".popup__input");
  const submitButton = formCard.querySelector(".popup__button");

  // Проверка валидности каждого инпута и наличие пустых инпутов
  const isValid = Array.from(inputs).every((input) => input.validity.valid);
  const isEmpty = Array.from(inputs).some((input) => !input.value.trim());

  // Активиция или наоборот кнопки сабмита в зависимости от валидности данных и наличия пустых инпутов
  if (isValid && !isEmpty) {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove("form__submit_inactive");
  } else {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add("form__submit_inactive");
  }
}

function checkAvatarFormValidityAndToggleSubmitButton() {
  const submitButton = formUpdateAvatar.querySelector(".popup__button");
  const isEmpty = !inputUpdateAvatar.value.trim();

  if (!isEmpty) {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove("form__submit_inactive");
  } else {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add("form__submit_inactive");
  }
}

// Вызов функции проверки валидности данных при открытии попапа
addButton.addEventListener("click", () => {
  openModal(addCard);
  checkValidityAndToggleSubmitButton();
});

// Вызов функции проверки валидности данных при вводе пользователем
formCard.addEventListener("input", checkValidityAndToggleSubmitButton);

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

// Обработчик события для открытия попапа при клике на изображение профиля
profImg.addEventListener("click", () => {
  profImg.classList.add("clicked");
  inputUpdateAvatar.value = "";
  openModal(popupUpdateAvatar);
  checkAvatarFormValidityAndToggleSubmitButton();
});

// Обработчик события для удаления класса при уводе курсора с изображения профиля
profImg.addEventListener("mouseout", () => profImg.classList.remove("clicked"));

// Обработчик события для закрытия попапа при клике на кнопку закрытия
avatarCloseModal.addEventListener("click", () => closeModal(popupUpdateAvatar));

// Обработчик события для отправки формы обновления аватара
formUpdateAvatar.addEventListener("submit", (evt) =>
  submitUpdateAvatar(evt, inputUpdateAvatar.value)
);

formUpdateAvatar.addEventListener(
  "input",
  checkAvatarFormValidityAndToggleSubmitButton
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
  profTitle.textContent = name;
  profDescr.textContent = about;
  profImg.style["background-image"] = `url("${avatar}")`;
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
      updateCards(cards); // Передача массива карточек и userId
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error); 
    });
};
fetchDataAndUpdate();
