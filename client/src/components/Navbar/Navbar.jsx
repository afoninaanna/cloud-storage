import React, { useState } from 'react';
import './style.css';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../reducers/userReducer';
import { getFiles, searchFiles } from '../../actions/file';
import { showLoader } from '../../reducers/appReducer';
import avatarLogo from '../../assets/avatar.svg';
import { API_URL } from '../../config';

const Navbar = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const currentDir = useSelector(state => state.files.currentDir);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);
  const avatar = currentUser.avatar ? `${API_URL + "/" + currentUser.avatar}` : avatarLogo;

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
        <div className='project-name' >Cloud Storage</div>
        {isAuth && <input placeholder='Введите имя файла' value={searchName} onChange={(e) => searchHandler(e)}/>}
        {!isAuth && <div className=''><NavLink to='/login'>Войти</NavLink></div>}
        {!isAuth && <div className=''><NavLink to='/registration'>Регистрация</NavLink></div>}
        {isAuth && <div className='' onClick={() => dispatch(logOut())} style={{marginTop: 10}}>Выйти</div>}
        {isAuth && <NavLink to='/profile'>
            <img className='avatar' src={avatar} alt='' style={{marginTop: 15}}/>
          </NavLink>
        }
    </div>
  )
}

export default Navbar;