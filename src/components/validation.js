//ПОКАЗАТЬ ОШИБКУ
export const showError = (form, input, errorMes) => {
    const formError = form.querySelector(`.${input.id}-error`);
    input.classList.add("form__input_type_error");
    formError.textContent = errorMes;
    formError.classList.add("form__input-error_active");
  };
  
  //СКРЫТЬ ОШИБКУ
  export const hideError = (form, input) => {
    const formError = form.querySelector(`.${input.id}-error`);
    input.classList.remove("form__input_type_error");
    formError.classList.remove("form__input-error_active");
    formError.textContent = "";
  };
  
  //ПРОВЕРКА ВАЛИДНОСТИ ОШИБКИ
  export const isValid = (form, input) => {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }
    if (!input.validity.valid) {
      showError(form, input, input.validationMessage);
    } else {
      hideError(form, input);
    }
  };
  
  //ДОБАВЛЯЕМ ОШИБКУ КО ВСЕМ ПОЛЯМ ФОРМЫ
  export const setEventListeners = (form) => {
    const inputList = Array.from(form.querySelectorAll(".popup__input"));
    const buttonElement = form.querySelector(".popup__button");
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        isValid(form, input);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  //ДОБАВЛЯЕМ ОШИБКУ К ФОРМАМ
  export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".popup__form"));
    formList.forEach((form) => {
      setEventListeners(form);
    });
  };
  
  //ПРОВЕРКА ВАЛИДНОСТИ ИНПУТОВ
  export const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  };
  
  //ПЕРЕКЛЮЧЕНИЕ КНОПКИ АКТИВНОСТИ
  export const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add("form__submit_inactive");
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove("form__submit_inactive");
    }
  };
  