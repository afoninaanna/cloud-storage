import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir, getFiles } from '../../actions/file';
import { setPopupDisplay } from '../../reducers/fileReducer';
import FileList from './FileList/FileList';
import Popup from './Popup';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  function showPopupHandler () {
    dispatch(setPopupDisplay('flex'));
  }
  return (
    <div>
      <div>
        <button>Назад</button>
        <button onClick={() => showPopupHandler()}>Создать папку</button>
      </div>
      <FileList/>
      <Popup/>
    </div>
  )
}

export default Disk