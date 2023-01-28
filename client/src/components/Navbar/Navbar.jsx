import React from 'react';
import './style.css';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../reducers/userReducer';
  

const Navbar = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();
  return (
    <div className='navbar'>
        <img src={logo} alt='' className=''/>
        <div className='project-name'>Cloud Storage</div>
        {!isAuth && <div className=''><NavLink to='/login'>Войти</NavLink></div>}
        {!isAuth && <div className=''><NavLink to='/registration'>Регистрация</NavLink></div>}
        {isAuth && <div className='' onClick={() => dispatch(logOut())}>Выйти</div>}
    </div>
  )
}

export default Navbar;