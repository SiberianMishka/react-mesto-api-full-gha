import React from 'react';
import { Link } from 'react-router-dom';

export default function FormPage({ title, buttonText, loginLinkText, email, password, onChange, onSubmit }) {

    return (
        <section className="form-page">
            <h2 className="form-page__title">{title}</h2>
            <form className="form-page__form" onSubmit={onSubmit}>
                <input
                    className="form-page__input"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email || ""}
                    onChange={onChange}
                />
                <input
                    className="form-page__input"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    required
                    value={password || ""}
                    onChange={onChange}
                />
                <button
                    className="form-page__button"
                    type="submit"
                    aria-label={buttonText}
                >
                    {buttonText}
                </button>
                {loginLinkText && <Link to="../sign-in" className="form-page__login-link">{loginLinkText}</Link>}
            </form>
        </section>
    )
}
