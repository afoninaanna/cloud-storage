import React from 'react'
import { useSelector } from 'react-redux'
import File from './File/File';
import './FileList.css';

const FileList = () => {
  const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file} />)
  const fileView = useSelector(state => state.files.view);

  if (!files.length) {
    return (
      <div>
        Файлы не найдены!
      </div>
    )
  }

  if(fileView === 'plate') {
    return (
      <div className='plate'>
        {files}
      </div>
    )
  }

  if(fileView === 'list') {
    return (
      <div>
        <div>
          <div>Название</div>
          <div>Дата</div>
          <div>Размер</div>
        </div>
        {files}
      </div>
    )
  }
  
  
}

export default FileList