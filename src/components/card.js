import { deleteCardOnServer, likeCardOnServer } from "./api";

const deleteCard = (_id) => {
  return deleteCardOnServer(_id)
    .then((data) => {
      console.log(data);
      // Удаляем элемент из DOM только после успешного ответа от сервера
      element.remove();
    })
    .catch((error) => {
      console.log("Удаление не удалось");
    });
};

export function delElement(element, _id) {
  deleteCard(_id)
    .then(() => {
      // Этот код выполнится только после успешного удаления на сервере
      element.remove();
    });
}

export function likeBtn(likeButton, _id) {
  const isActive = likeButton.classList.contains("card__like-button_is-active");

  // Вызываем функцию отправки запроса на сервер
  likeCardOnServer(_id, isActive)
    .then((data) => {
      console.log(data);
      const likesCount = likeButton.parentElement.querySelector(".card__likes");
      // Обновляем счетчик лайков
      likesCount.textContent = data.likes.length;
      // Переключаем класс активного состояния кнопки лайка
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((error) => {
      console.log("Не удалось поставить/снять лайк");
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
  isMine,
  userId
) {
  const template = document.querySelector("#card-template").content;
  const cardElement = template.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCount = cardElement.querySelector(".card__likes");

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = linkValue;
  cardImage.alt = nameValue;
  cardElement.querySelector(".card__title").textContent = nameValue;

  // Проверка лайка пользователя на карточке
  const isLikedByUser = likes.some((like) => like._id === userId);

  if (likes && likes !== null) {
    likesCount.textContent = likes.length ? likes.length : 0;
  } else {
    likesCount.textContent = 0;
  }

  // Если карточка лайкнута пользователем, делаю кнопку лайка активной
  if (isLikedByUser) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (isMine) {
    deleteButton.style.display = "block"; // Показываю кнопку удаления
  } else {
    deleteButton.style.display = "none"; // Скрываю кнопку удаления
  }

  // Слушатель события на кнопку лайка
  likeButton.addEventListener("click", () => {
    likeHandler(likeButton, _id);
  });

  // Слушатель события на кнопку удаления
  deleteButton.addEventListener("click", () => delHandler(cardElement, _id));

  // Слушатель события на изображение
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openHandler);

  return cardElement;
}
