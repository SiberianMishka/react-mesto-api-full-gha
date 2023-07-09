import React from 'react';
import FormPage from './FormPage';

export default function Login({ onChange, onSubmit, formValue }) {

    return (
        <FormPage
            title="Вход"
            buttonText="Войти"
            loginLinkText=""
            email={formValue.email}
            password={formValue.password}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}