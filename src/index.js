import './index.css';
import { initialCards, places__list, delElement, createCard } from './components/cards.js';
import { closeModal, clickOutsideHandler, keyClickClose, addCard, editPopUp, popImg } from './components/modal.js';
import addIcon from "../images/add-icon.svg";
import avatar from "../images/avatar.jpg";


const addButton = document.querySelector(".profile__add-button");
const editBtn = document.querySelector('.profile__edit-button');
const popUpImg = document.querySelector('.popup__image');
const popCaption = document.querySelector('.popup__caption');

//СОЗДАНИЕ КАРТОЧЕК
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData.name, cardData.link, likeBtn, addCardNew );
  places__list.append(cardElement);
});

//ОБРАБОТЧИК ОТКРЫТИЯ ОКНА РЕДАКТИРОВАНИЯ
addButton.addEventListener('click', function(evt){
  addCard.classList.add('popup_is-opened');
  addEscapeEventListener();
})

//ОБРАБОТЧИК ОТКРЫТИЯ ОКНА ДОБАВЛЕНИЯ КАРТОЧКИ
editBtn.addEventListener('click', function(evt){
  editPopUp.classList.add('popup_is-opened');
  addEscapeEventListener();
})


const popAddClose = document.querySelector('.popup_type_new-card .popup__close');
const popEditClose = document.querySelector('.popup_type_edit .popup__close');

//ОБРАБОТЧИК ЗАКРЫТИЯ ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ ЧЕРЕЗ КРЕСТИК
popAddClose.addEventListener('click', () => {    
  closeModal(addCard);
  removeEscapeEventListener();
});

//ОБРАБОТЧИК ЗАКРЫТИЯ ОКНА РЕДАКТИРОВАНИЯ ЧЕРЕЗ КРЕСТИК
popEditClose.addEventListener('click', () => {   
    closeModal(editPopUp);
    removeEscapeEventListener();}
  );

//СЛУШАТЕЛЬ ФУНКЦИИ ЗАКРЫТИЯ ПОПАПОВ ПРИ КЛИКЕ НА ФОН
document.addEventListener('click', clickOutsideHandler);


// СЛУШАТЕЛЬ ЗАКРЫТИЯ ПОПАПА КЛИКОМ НА ESCAPE    
document.addEventListener('keydown', keyClickClose);

function addEscapeEventListener() {
  document.addEventListener('keydown', keyClickClose);
}

// Функция для удаления обработчика события закрытия по нажатию на Escape
function removeEscapeEventListener() {
  document.removeEventListener('keydown', keyClickClose);
}

const cardLikeButtons = document.querySelectorAll('.card__like-button');


document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('card__image')) {
    const cardImg = evt.target;
    const imgDesp = cardImg.parentElement.querySelector('.card__title').textContent; 
    popUpImg.src = cardImg.src; 
    popCaption.textContent = imgDesp; 
    popImg.classList.add('popup_is-opened'); 
  }
});


//ЗАКРЫТИЕ КАРТИНКИ ПО КРЕСТИКУ
const imgClose = document.querySelector('.popup_type_image .popup__close')

imgClose.addEventListener('click', () => {  
  closeModal(popImg)});

  





  
//ФУНКЦИЯ ОБРАБОТЧИК ЛАЙКА
function likeBtn(evt){
  evt.addEventListener('click', ()=>{
    evt.classList.toggle('card__like-button_is-active')
  })
};

//ВЫЗОВ ОБРАБОТЧИКА ЛАЙКА
cardLikeButtons.forEach(likeBtn);

//РЕДАКТИРОВАНИЕ ИМЕНИ И ИНФОРМАЦИИ О СЕБЕ
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    nameInput.value;
    jobInput.value;
    const profTitle = document.querySelector('.profile__title');
    const profJob = document.querySelector('.profile__description');

    profTitle.textContent = nameInput.value;
    profJob.textContent = jobInput.value;

    closeModal(editPopUp)
}

formElement.addEventListener('submit', handleFormSubmit);


//ДОБАВЛЕНИЕ КАРТОЧКИ
const formCard = document.forms[1];
const nameInputCard = document.querySelector('.popup__input_type_card-name');
const descInputCard = document.querySelector('.popup__input_type_url');


function addCardNew(evt){
  evt.preventDefault(); 
  const newCard = {
    name: nameInputCard.value,
    link: descInputCard.value
  };

  const newCardElement = createCard(newCard.name, newCard.link);
  places__list.insertBefore(newCardElement, places__list.firstChild);

  nameInputCard.value = '';
  descInputCard.value = '';

  closeModal(addCard);
}

formCard.addEventListener('submit', addCardNew);






