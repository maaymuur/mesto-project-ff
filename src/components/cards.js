export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

export const places__list = document.querySelector(".places__list");

export function delElement(element) {
element.remove();
}

export function createCard(nameValue, linkValue) {
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


