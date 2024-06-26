//ПОКАЗАТЬ ОШИБКУ
export const showError = (form, input, errorMes, settings) => {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  formError.textContent = errorMes;
  formError.classList.add(settings.errorClass);
};

//СКРЫТЬ ОШИБКУ
export const hideError = (form, input, settings) => {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.errorClass);
  formError.textContent = "";
};

//ПРОВЕРКА ВАЛИДНОСТИ ОШИБКИ
export const validateInput = (form, input, settings) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, settings);
  } else {
    hideError(form, input, settings);
  }
};

//ДОБАВЛЯЕМ ОШИБКУ КО ВСЕМ ПОЛЯМ ФОРМЫ
export const setEventListeners = (
  form,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }
) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonElement = form.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(form, input, { inputErrorClass, errorClass });
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

//ДОБАВЛЯЕМ ОШИБКУ К ФОРМАМ
export const enableValidation = (settings) => {
  if (!settings) return; // Проверка на наличие настроек

  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  } = settings;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    setEventListeners(form, {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    });
  });
};

//ПРОВЕРКА ВАЛИДНОСТИ ИНПУТОВ
export const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

//ПЕРЕКЛЮЧЕНИЕ КНОПКИ АКТИВНОСТИ
export const toggleButtonState = (
  inputList,
  buttonElement,
  { inactiveButtonClass }
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// Функция для очистки ошибок валидации и делает кнопку неактивной
export function clearValidation(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  // УУдаление классов ошибок у инпутов и текстовых сообщений.
  inputList.forEach((input) => {
    input.classList.remove(settings.inputErrorClass);
    const errorElement = formElement.querySelector(`.${input.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(settings.errorClass);
  });

  // Деактивация кнопки
  buttonElement.disabled = true;
  buttonElement.classList.add(settings.inactiveButtonClass);
}
