class Auth {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkResponce(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    register = (password, email) => {
        return fetch(`${this._baseUrl}signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, email })
        })
            .then(this._checkResponce)
    };

    authorize = (password, email) => {
        return fetch(`${this._baseUrl}signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, email })
        })
            .then(this._checkResponce)
    };

    checkToken = (token) => {
        return fetch(`${this._baseUrl}users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(this._checkResponce)
    };
}

const auth = new Auth({
    // baseUrl: 'http://localhost:3000',
    // baseUrl: 'https://auth.nomoreparties.co/',
    baseUrl: 'https://api.stremaus.nomoredomains.work/',
});

export default auth;