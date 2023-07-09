export default function ImagePopup({ card, onClose }) {

    return (
        <div className={`popup popup-image ${JSON.stringify(card) !== '{}' && "popup_opened"}`}>
            <div className="popup-image__container">
                <button
                    onClick={onClose}
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть попап"
                ></button>
                <img className="popup-image__image" alt={card.name} src={card.link} />
                <p className="popup-image__name">{card.name}</p>
            </div>
        </div>
    )
}