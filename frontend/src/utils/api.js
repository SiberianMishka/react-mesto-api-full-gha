class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponce(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._checkResponce)
  }

  // Редактирование профиля
  setUserInfo(userData) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(this._checkResponce)
  }

  // Загрузка карточек с сервера
  getInitialCards() {

    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._checkResponce)
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._checkResponce)
  }

  // Добавление новой карточки
  addCard(cardData) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
      .then(this._checkResponce)
  }

  // Обновление аватара пользователя
  setAvatar(avatarLink) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(this._checkResponce)
  }

  // Постановка и снятие лайка
  changeLikeCardStatus(cardId, isNotLiked) {
    if (isNotLiked) {
      return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(this._checkResponce)
    } else {
      return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(this._checkResponce)
    }
  }
}

// Получение данных с сервера
const api = new Api({
  baseUrl: 'https://api.stremaus.nomoredomains.work/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;