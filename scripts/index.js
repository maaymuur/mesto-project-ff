// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const places__list = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");

function delElement(element) {
  element.remove();
}

function createCard(nameValue, linkValue) {
  const template = document.querySelector("#card-template").content;
  const cardElement = template.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = linkValue;
  cardElement.querySelector(".card__title").textContent = nameValue;

  deleteButton.addEventListener("click", function () {
    delElement(cardElement);
  });

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData.name, cardData.link);
  places__list.append(cardElement);
});
