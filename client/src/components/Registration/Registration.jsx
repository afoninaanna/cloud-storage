import React, { useState } from 'react';
import { registration } from '../../actions/user';
import './style.css';
import logo from '../../assets/SuaLogo.svg';
import sharp from '../../assets/sharp.svg'

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className='registration-form'>
      <div className='content-form'>
        <div className='inputs'>
          <img src={logo} alt=''/>
          <img src={sharp} alt='' />
          <input type='text' placeholder='Введите почту' value={email} onChange={ (event) => setEmail(event.target.value)}/>
          <input type='password' placeholder='Введите пароль' value={password} onChange={(event) => setPassword(event.target.value)} />
          <button onClick={() => registration(email, password)}>Зарегистрироваться</button>
        </div>
      </div>
    </div>
  )
}

export default Registration;