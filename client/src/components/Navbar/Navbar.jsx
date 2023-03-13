import React, { useState } from 'react';
import './style.css';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../reducers/userReducer';
import { getFiles, searchFiles } from '../../actions/file';
import { showLoader } from '../../reducers/appReducer';
  

const Navbar = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const currentDir = useSelector(state => state.files.currentDir);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);

  function searchHandler(e) {
    setSearchName(e.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value !== "") {
      setSearchTimeout(setTimeout((value) => {
        dispatch(searchFiles(value));
      }, 500, e.target.value));
    } else {
      dispatch(getFiles(currentDir))
    }
  }

  return (
    <div className='navbar'>
        <img src={logo} alt='' className=''/>
        <div className='project-name'>Cloud Storage</div>
        {isAuth && <input placeholder='Введите имя файла' value={searchName} onChange={(e) => searchHandler(e)}/>}
        {!isAuth && <div className=''><NavLink to='/login'>Войти</NavLink></div>}
        {!isAuth && <div className=''><NavLink to='/registration'>Регистрация</NavLink></div>}
        {isAuth && <div className='' onClick={() => dispatch(logOut())}>Выйти</div>}
    </div>
  )
}

export default Navbar;