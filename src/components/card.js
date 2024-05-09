import { deleteCardOnServer, likeCardOnServer } from "./api";

//Функция удаления карточки, обращение к серверу
const deleteCard = (_id) => {
  deleteCardOnServer(_id)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("Удаление не удалось");
    });
};

export function delElement(element, _id) {
  element.remove();
  deleteCard(_id);
}

export function likeBtn(likeButton, _id) {
  const isActive = likeButton.classList.contains("card__like-button_is-active");
  // Меняем состояние лайка
  likeButton.classList.toggle("card__like-button_is-active");

  // Вызываем функцию отправки запроса на сервер
  likeCardOnServer(_id, isActive)
    .then((data) => {
      console.log(data);
      const likesCount = likeButton.parentElement.querySelector(".card__likes");
      // Обновляем счетчик лайков и состояние кнопки
      likesCount.textContent = data.likes.length;
    })
    .catch((error) => {
      // Обработка ошибок, если лайк не удалось установить или удалить
    });
}

export function createCard(
  nameValue,
  linkValue,
  likeHandler,
  delHandler,
  openHandler,
  likes,
  _id,
  isMine
) {
  const template = document.querySelector("#card-template").content;
  const cardElement = template.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCount = cardElement.querySelector(".card__likes");

  cardElement.querySelector(".card__image").src = linkValue;
  cardElement.querySelector(".card__title").textContent = nameValue;
  if (likes && likes !== null) {
    likesCount.textContent = likes.length ? likes.length : 0;
  } else {
    likesCount.textContent = 0;
  }

  if (isMine) {
    deleteButton.style.display = "block"; // Показываем кнопку удаления
  } else {
    deleteButton.style.display = "none"; // Скрываем кнопку удаления
  }

  // Добавляем слушатель события на кнопку лайка
  likeButton.addEventListener("click", () => {
    likeHandler(likeButton, _id);
  });

  // Добавляем слушатель события на кнопку удаления
  deleteButton.addEventListener("click", () => delHandler(cardElement, _id));

  // Добавляем слушатель события на изображение
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openHandler);

  return cardElement;
}
