

export function delElement(element) {
    element.remove();
  }

  function handleResponse(response) {
    if (response.ok) {
        return response.json(); // Возвращает обещание, разрешенное с объектом данных JSON
    } else {
        throw new Error('Network response was not ok.'); // Выбрасывает ошибку, если ответ от сервера не успешен
    }

  }
 
  export function likeBtn(likeButton, _id) {
    likeButton.classList.toggle("card__like-button_is-active");
    const likesCount = document.querySelector('.card__likes');
    const newLikesCount = Number(likesCount.textContent) + 1; // Увеличиваем количество лайков
    fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${_id}`, {
      method: "PUT",
      headers: {
          authorization: "e5e5de72-de46-4c51-be74-1878519f8c80",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ likes: newLikesCount }) // Отправляем новое количество лайков на сервер
  })
    .then(handleResponse)
    .then(data => {
        console.log("Лайк успешно добавлен:", data);
        likesCount.textContent = newLikesCount; // Обновляем интерфейс
    })
    .catch(error => {
        console.error("Ошибка при добавлении лайка:", error);
    });
}

  export function createCard(
    nameValue,
    linkValue,
    likeHandler,
    delHandler,
    openHandler,
    likes,
    cardId
  ) {

    const template = document.querySelector("#card-template").content;
    const cardElement = template.querySelector(".card").cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const likesCount = cardElement.querySelector('.card__likes');
  
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
    cardElement.querySelector(".card__image").addEventListener("click", openHandler);
  
    return cardElement;
  }
