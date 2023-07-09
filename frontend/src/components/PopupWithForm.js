export default function PopupWithForm({ isOpen, onClose, title, name, children, buttonTitle, onSubmit }) {

    return (
        <div className={`popup ${isOpen && "popup_opened"}`} >
            <div className="popup__container">
                <button
                    onClick={onClose}
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть попап"
                ></button>
                <h2 className="popup__header">{title}</h2>
                <form className="popup__form add-form" name={name} onSubmit={onSubmit}>
                    {children}
                    <button
                        className="popup__button"
                        type="submit"
                        aria-label={buttonTitle}
                    >
                        {buttonTitle}
                    </button>
                </form>
            </div>
        </div>
    )
}