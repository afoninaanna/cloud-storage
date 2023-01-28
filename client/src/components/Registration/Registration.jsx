import React, { useState } from 'react';
import { registration } from '../../actions/user';
import './style.css';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className='registration-form'>
      <div>Регистрация</div>
      <input type='text' placeholder='Введите почту' value={email} onChange={ (event) => setEmail(event.target.value)}/>
      <input type='password' placeholder='Введите пароль' value={password} onChange={(event) => setPassword(event.target.value)} />
      <button onClick={() => registration(email, password)}>Войти</button>
    </div>
  )
}

export default Registration;