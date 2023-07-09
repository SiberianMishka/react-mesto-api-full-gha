import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            buttonTitle="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input-name"
                name="name"
                id="name"
                type="text"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
                value={name || ""}
                onChange={handleChangeName}
            />
            <span className="popup__error" id="name-error"></span>
            <input
                className="popup__input popup__input-about"
                name="about"
                id="about"
                type="text"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
                value={description || ""}
                onChange={handleChangeDescription}
            />
            <span className="popup__error" id="about-error"></span>
        </PopupWithForm>
    )
}