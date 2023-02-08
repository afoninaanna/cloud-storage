import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDir } from '../../actions/file';
import { setPopupDisplay } from '../../reducers/fileReducer';
import './Popup.css';

const Popup = () => {
    const [dirName, setDirName] = useState('');
    const popupDisplay = useSelector(state => state.files.popupDisplay);
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);

    function createDirHandler() {
        dispatch(createDir(currentDir, dirName));
        setDirName('');
        dispatch(setPopupDisplay('none'));
    }
    return (
        <div className='popup' onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay}}>
            <div className='popup-content' onClick={(event) => event.stopPropagation()}>
                <div className='popup-header'>
                    <div className='popup-title'>Создать новую папку</div>
                    <button className='popup-close' onClick={() => dispatch(setPopupDisplay('none'))}>X</button>
                </div>
                <input type='text' placeholder="Введите название папки" value={dirName} onChange={(event) => setDirName(event.target.value)}/>
                <br/>
                <button className='popup-create' onClick={() => createDirHandler()}>Создать</button>
            </div>
        </div>
    )
}

export default Popup