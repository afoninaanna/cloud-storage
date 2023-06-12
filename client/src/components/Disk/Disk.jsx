import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir, getFiles, uploadFile } from '../../actions/file';
import { setCurrentDir, setFileView, setPopupDisplay } from '../../reducers/fileReducer';
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
  const [iv, setIv] = useState({});
  const [key, setKey] = useState({});

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
    files.forEach( (file) => {
      encryptblob(file).then((value) => {
        const fileName = file.name;
        console.log(fileName);
        setIv({...iv, [fileName]: value[1]});
        setKey({...key, [fileName]: value[2]});
        dispatch(uploadFile(value[0]), currentDir);
      });
    });
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

  async function encryptblob(blob) {
    let iv = crypto.getRandomValues(new Uint8Array(12));
    
    let algorithm = {
      name: "AES-GCM",
      iv: iv
    }
    let key = await crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256
      },
      true,
      ["encrypt", "decrypt"]
    );
    let data = await blob.arrayBuffer();

    const result = await crypto.subtle.encrypt(algorithm, key, data);

    let exportedkey = await crypto.subtle.exportKey("jwk", key);

    return [new Blob([result]), iv.toString(), exportedkey];
  }

  function drogHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    setDragEnter(false);

    files.forEach( (file) => {
      encryptblob(file).then((value) => {
        const fileName = file.name;
        setIv({ ...iv, [fileName]: value[1] });
        setKey({ ...key, [fileName]: value[2] });
        dispatch(uploadFile(value[0], file.name ), currentDir);
      });
    });
  }
  console.log(iv);
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
        <div className='btns'>
          <button className='disk-btn' onClick={() => backClickHandler()}>Назад</button>
          <button className='disk-btn' onClick={() => showPopupHandler()}>Создать папку</button>
        </div>

        <div className='container'>
          <div>
            <label htmlFor='input-upload'>Загрузить файл</label>
            <input multiple={true} onChange={(event) => fileUploadHadler(event)} type='file' id='input-upload'/>
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value='name'>По имени</option>
            <option value='type'>По типу</option>
            <option value='date'>По дате</option>
          </select>
          <button className='disk-plate' onClick={() => dispatch(setFileView('plate'))} />
          <button className='disk-list' onClick={() => dispatch(setFileView('list'))} />
        </div>
        
      </div>
      <FileList iv={iv} ckey={key}/>
      <Popup/>
    </div>
    :
    <div className='drop-area' onDrop={drogHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
      <p>Перетащите файлы сюда</p>
    </div>
  )
}

export default Disk