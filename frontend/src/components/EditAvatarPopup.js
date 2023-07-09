import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    }

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen])

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            buttonTitle="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input-avatar"
                name="link"
                id="avatar"
                type="url"
                placeholder="https://somewebsite.com/someimage.jpg"
                required
                ref={avatarRef}
            />
            <span className="popup__error" id="avatar-error"></span>
        </PopupWithForm>
    )
}