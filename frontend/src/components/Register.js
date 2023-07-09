import React from 'react';
import FormPage from './FormPage';

export default function Register({ onChange, onSubmit, formValue }) {

    return (
        <FormPage
            title="Регистрация"
            buttonText="Зарегистрироваться"
            loginLinkText="Уже зарегистрированы? Войти"
            email={formValue.email}
            password={formValue.password}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}