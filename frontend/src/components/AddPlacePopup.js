import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen])

    return (
        <PopupWithForm
            name="add-place"
            title="Новое место"
            buttonTitle="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input-place"
                name="name"
                id="place"
                type="text"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                value={name || ""}
                onChange={handleChangeName}
            />
            <span className="popup__error" id="place-error"></span>
            <input
                className="popup__input popup__input-img"
                name="link"
                id="link"
                type="url"
                placeholder="Ссылка на картинку"
                required
                value={link || ""}
                onChange={handleChangeLink}
            />
            <span className="popup__error" id="link-error"></span>
        </PopupWithForm>
    )
}