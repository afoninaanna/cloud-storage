import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir, getFiles, uploadFile } from '../../actions/file';
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer';
import FileList from './FileList/FileList';
import Popup from './Popup';
import './Disk.css';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);
  const loader = useSelector(state => state.app.loader);
  const dirStack = useSelector(state => state.files.dirStack);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState('type');

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

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

  function dragEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function drogHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    setDragEnter(false);
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
  }

  if (loader) {
    return (
      <div>
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  return ( !dragEnter?
    <div onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
      <div>
        <button onClick={() => backClickHandler()}>Назад</button>
        <button onClick={() => showPopupHandler()}>Создать папку</button>
        <div>
          <label htmlFor='input-upload'>Загрузить файл</label>
          <input multiple={true} onChange={(event) => fileUploadHadler(event)} type='file' id='input-upload'/>
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value='name'>По имени</option>
          <option value='type'>По типу</option>
          <option value='date'>По дате</option>
        </select>
      </div>
      <FileList/>
      <Popup/>
    </div>
    :
    <div className='drop-area' onDrop={drogHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
      Перетащите файлы сюда
    </div>
  )
}

export default Disk