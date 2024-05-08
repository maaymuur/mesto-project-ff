export function delElement(element) {
  element.remove();
}

const handleResponse = (response) => {
  console.log(response);
  return response.json();
};

export function likeBtn(likeButton, _id) {
  // Определяем, есть ли уже лайк на этой карточке

  const isActive = likeButton.classList.contains("card__like-button_is-active");
  // Меняем состояние лайка
  likeButton.classList.toggle("card__like-button_is-active");


  // Отправляем запрос на сервер в зависимости от состояния лайка
  fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${_id}`, {
    method: isActive ? 'DELETE' : 'PUT',
    headers: {
      authorization: "e5e5de72-de46-4c51-be74-1878519f8c80",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: _id,
    }),
  })
    .then(handleResponse)
    .then((data) => {
      console.log(data);
      const likesCount = likeButton.parentElement.querySelector(".card__likes");
      // Обновляем счетчик лайков и состояние кнопки
      likesCount.textContent = data.likes.length;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
export function createCard(
  nameValue,
  linkValue,
  likeHandler,
  delHandler,
  openHandler,
  likes,
  _id
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

  // Добавляем слушатель события на кнопку лайка
  likeButton.addEventListener("click", () => {
    likeHandler(likeButton, _id);
  });

  // Добавляем слушатель события на кнопку удаления
  deleteButton.addEventListener("click", () => delHandler(cardElement));

  // Добавляем слушатель события на изображение
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openHandler);

  return cardElement;
}
