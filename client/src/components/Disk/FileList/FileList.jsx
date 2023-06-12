import React from 'react'
import { useSelector } from 'react-redux'
import File from './File/File';
import './FileList.css';

const FileList = ({iv, ckey}) => {
  const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file} iv={iv} ckey={ckey}/>)
  const fileView = useSelector(state => state.files.view);

  if (!files.length) {
    return (
      <div className='none'>
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
      <div className='fileList'>
        <div className='fileList-header'>
          <div className='name'>Название</div>
          <div className='date'>Дата</div>
          <div className='size'>Размер</div>
        </div>
        {files}
      </div>
    )
  }
  
  
}

export default FileList