export const addCard = document.querySelector('.popup_type_new-card');
export const editPopUp = document.querySelector('.popup_type_edit');
export const popImg = document.querySelector('.popup_type_image');

//закрытие карточки одна функция на все
export function closeModal(evt){
    evt.classList.remove('popup_is-opened');
  };
  
//ЗАКРЫТИЕ ВСЕХ ОКОН ПРИ КЛИКЕ НА ФОН
export function clickOutsideHandler(event) {
    if (event.target.classList.contains('popup')) {  
        closeModal(event.target); 
    }
  }

//ЗАКРЫТИЕ ВСЕХ ОКОН ПРИ КЛИКЕ НА ESCAPE
export function keyClickClose(event) {
    if (event.key === 'Escape' && event.keyCode === 27) { 
      closeModal(addCard); 
      closeModal(editPopUp);
      closeModal(popImg)
    }
  }

  