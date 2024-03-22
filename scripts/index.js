// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const places__list = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const popUp = document.querySelector(".popup_type_new-card");

function addCard(nameValue, linkValue) {
  const template = document.querySelector("#card-template").content;
  const templateCopy = template.querySelector(".card").cloneNode(true);
  const resetButton = templateCopy.querySelector(".card__delete-button");

  templateCopy.querySelector(".card__image").src = linkValue;
  templateCopy.querySelector(".card__title").textContent = nameValue;

  places__list.append(templateCopy);

  resetButton.addEventListener("click", function () {
    delElement(templateCopy);
  });
}

for (i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].name, initialCards[i].link);
}

function delElement(element) {
  element.remove();
}
