import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir, getFiles, uploadFile } from '../../actions/file';
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer';
import FileList from './FileList/FileList';
import Popup from './Popup';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);
  const dirStack = useSelector(state => state.files.dirStack);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  function showPopupHandler () {
    dispatch(setPopupDisplay('flex'));
  }

  function backClickHandler() {
    const backDir = dirStack.pop();
    dispatch(setCurrentDir(backDir));
  }

  function fileUploadHadler(event) {
    const files = [...event.target.files];
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
  }

  return (
    <div>
      <div>
        <button onClick={() => backClickHandler()}>Назад</button>
        <button onClick={() => showPopupHandler()}>Создать папку</button>
        <div>
          <label htmlFor='input-upload'>Загрузить файл</label>
          <input multiple={true} onChange={(event) => fileUploadHadler(event)} type='file' id='input-upload'/>
        </div>
      </div>
      <FileList/>
      <Popup/>
    </div>
  )
}

export default Disk