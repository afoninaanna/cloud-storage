import React, { useState } from 'react';
import { login } from '../../actions/user';
import './style.css';
import { useDispatch } from "react-redux";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    return (
        <div className='login-form'>
            <div>Авторизация</div>
            <input type='text' placeholder='Введите почту' value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type='password' placeholder='Введите пароль' value={password} onChange={(event) => setPassword(event.target.value)} />
            <button onClick={() => dispatch(login(email, password))}>Войти</button>
        </div>
    )
}

export default Login;