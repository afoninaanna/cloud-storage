import React, { useState } from 'react';
import { login } from '../../actions/user';
import './style.css';
import { useDispatch } from "react-redux";
import logo from '../../assets/SuaLogo.svg';
import sharp from '../../assets/sharp.svg'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    return (
        <div className='login-form'>
            <div className='content-form'>
                <div className='inputs'>
                    <img src={logo} alt='' />
                    <img src={sharp} alt='' />
                    <input type='text' placeholder='Введите почту' value={email} onChange={(event) => setEmail(event.target.value)} />
                    <input type='password' placeholder='Введите пароль' value={password} onChange={(event) => setPassword(event.target.value)} />
                    <button onClick={() => dispatch(login(email, password))}>Войти</button>
                </div>
            </div>
        </div>
    )
}

export default Login;