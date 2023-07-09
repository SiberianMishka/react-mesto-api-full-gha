import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    );;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="element">
            <img className="element__image" onClick={handleClick} alt={card.name} src={card.link} />
            <div className="element__text">
                <p className="element__name">{card.name}</p>
                <div className="element__like">
                    <button
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                        type="button"
                        aria-label="Лайк"
                    ></button>
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
            </div>
            {isOwn &&
                <button
                    className="element__delete-button"
                    type="button"
                    aria-label="Удалить"
                    onClick={handleDeleteClick}
                />
            }
        </li>
    )
}