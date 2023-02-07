import React from 'react'
import { useSelector } from 'react-redux'
import File from './File/File'

const FileList = () => {
  const files = useSelector(state => state.files.files).map(file => <File key={file.id} file={file}/>)
  
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