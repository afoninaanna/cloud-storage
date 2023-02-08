import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir, getFiles } from '../../actions/file';
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
  return (
    <div>
      <div>
        <button onClick={() => backClickHandler()}>Назад</button>
        <button onClick={() => showPopupHandler()}>Создать папку</button>
      </div>
      <FileList/>
      <Popup/>
    </div>
  )
}

export default Disk