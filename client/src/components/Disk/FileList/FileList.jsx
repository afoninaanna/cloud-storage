import React from 'react'
import { useSelector } from 'react-redux'
import File from './File/File'

const FileList = () => {
  const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file}/>)

  if (!files.length) {
    return (
      <div>
        Файлы не найдены!
      </div>
    )
  }
  
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

export default FileList