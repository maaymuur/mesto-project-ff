import { updateUserInfo } from "../index.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "e5e5de72-de46-4c51-be74-1878519f8c80",
    "Content-Type": "application/json",
  },
};

export const handleResponse = (response) => {
  return response.json();
};

// Функция для добавления новой карточки
export const newCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(handleResponse)
    .catch((error) => {
      console.error("Ошибка при добавлении новой карточки:", error);
      throw error;
    });
};

// Функция для редактирования профиля
export const editProfile = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(userData),
  })
    .then(handleResponse)
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
      throw error;
    });
};

// Функция для обновления аватара
export function updateAvatarOnServer(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar: avatar }),
  })
    .then(handleResponse)
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
      throw error;
    });
}

export const getData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then(handleResponse)
    .then((data) => {
      updateUserInfo(data); // Обновляю информацию о пользователе
      console.log(data);
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
    });
};

export const deleteCardOnServer = (_id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/${_id}`, {
    method: "DELETE",
    headers: {
      authorization: "e5e5de72-de46-4c51-be74-1878519f8c80",
      "Content-Type": "application/json",
    },
  })
    .then(handleResponse)
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
      throw error;
    });
};

export const likeCardOnServer = (_id, isActive) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${_id}`, {
    method: isActive ? "DELETE" : "PUT",
    headers: {
      authorization: "e5e5de72-de46-4c51-be74-1878519f8c80",
      "Content-Type": "application/json",
    },
  })
    .then(handleResponse)
    .catch((error) => {
      console.error("Ошибка при отправке запроса на лайк карточки:", error);
      throw error;
    });
};
