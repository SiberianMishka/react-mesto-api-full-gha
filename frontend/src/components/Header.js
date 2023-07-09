import React from 'react';
import logo from '../images/logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

export default function Header({ email, onSignOut }) {

    return (
        <header className="header">
            <img
                className="header__logo"
                alt="Логотип Место"
                src={logo}
            />
            <div className="header__wrapper">
                {email && <p className='header__email'>{email}</p>}
                <Routes>
                    <Route path="/" element={<Link className="header__link" to="/sign-in" onClick={onSignOut}>Выйти</Link>} />
                    <Route path="sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>} />
                    <Route path="sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>} />
                </Routes>
            </div>
        </header>
    )
}