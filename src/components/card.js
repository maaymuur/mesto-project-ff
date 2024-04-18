
export function delElement(element) {
    element.remove();
  }
  
  export function likeBtn(likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
  }
  
  export function createCard(
    nameValue,
    linkValue,
    likeHandler,
    delHandler,
    openHandler
  ) {
    const template = document.querySelector("#card-template").content;
    const cardElement = template.querySelector(".card").cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
  
    cardElement.querySelector(".card__image").src = linkValue;
    cardElement.querySelector(".card__title").textContent = nameValue;
  
    likeButton.addEventListener("click", () => likeHandler(likeButton));
    deleteButton.addEventListener("click", () => delHandler(cardElement));

    cardElement.querySelector(".card__image").addEventListener('click', openHandler
);
    
    return cardElement;
  }
  