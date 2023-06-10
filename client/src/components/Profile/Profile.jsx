import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { deleteAvatar, uploadAvatar } from '../../actions/user';
import './Profile.css';

const Profile = () => {
    const dispatch = useDispatch();

    function changeHandler(e) {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
    }

    return (
        <div className='containe'>
            <NavLink to="/"><button className='back'>Назад</button></NavLink>
            <div>
                <button onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
                <input accept='image/*' onChange={(e) => changeHandler(e)} type='file' placeholder='Загрузить аватар'/>
            </div>
        </div>
    )
}

export default Profile