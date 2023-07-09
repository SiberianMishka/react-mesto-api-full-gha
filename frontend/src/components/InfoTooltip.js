import React from 'react';
import ok from '../images/ok-icon.svg';
import error from '../images/error-icon.svg'

export default function InfoTooltip({ isOpen, onClose, regError }) {

    return (
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button
                    onClick={onClose}
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть попап"
                ></button>
                <img
                    className="popup__icon"
                    alt={regError ? "Символ ошибки" : "Символ ок"}
                    src={regError ? error : ok}
                />
                <h2 className="popup__text">{regError ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}</h2>
            </div>

        </div>
    )
}