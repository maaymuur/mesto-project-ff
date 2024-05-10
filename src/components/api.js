const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "e5e5de72-de46-4c51-be74-1878519f8c80",
    "Content-Type": "application/json",
  },
};

export const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка ${response.status}`);
  }
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
  }).then(handleResponse);
};

// Функция для редактирования профиля
export const editProfile = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(userData),
  }).then(handleResponse);
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
  }).then(handleResponse);
}

export const getData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

export const deleteCardOnServer = (_id) => {
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export const likeCardOnServer = (_id, isActive) => {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: isActive ? "DELETE" : "PUT",
    headers: config.headers,
  }).then(handleResponse);
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then(handleResponse);
};