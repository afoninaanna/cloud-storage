import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles } from '../../actions/file';
import FileList from './FileList/FileList';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);
  return (
    <div>
      <div>
        <button>Назад</button>
        <button>Создать папку</button>
      </div>
      <FileList/>
    </div>
  )
}

export default Disk