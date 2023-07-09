import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';

export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button
                    onClick={onEditAvatar}
                    className="profile__edit-avatar-button"
                    type="button"
                    aria-label="Редактировать аватар"
                >
                    <img className="profile__avatar" alt="Аватар" src={currentUser.avatar} />
                </button>
                <div className="profile-info">
                    <h1 className="profile-info__name">{currentUser.name}</h1>
                    <button
                        onClick={onEditProfile}
                        className="profile-info__edit-button"
                        type="button"
                        aria-label="Редактировать профиль"
                    ></button>
                    <h2 className="profile-info__about">{currentUser.about}</h2>
                </div>
                <button
                    onClick={onAddPlace}
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить карточку"
                ></button>
            </section>
            <section className="elements" aria-label="elements">
                <ul className="elements__grid">
                    {cards.map((card) =>
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />)
                    }
                </ul>
            </section>
        </main>
    )
}