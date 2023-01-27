import React from 'react';
import './style.css';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
  

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt='' className=''/>
        <div className='project-name'>Cloud Storage</div>
        <div className=''><NavLink to='/login'>Войти</NavLink></div>
        <div className=''><NavLink to='/registration'>Регистрация</NavLink></div>
    </div>
  )
}

export default Navbar;