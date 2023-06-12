import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, downloadFile } from '../../../../actions/file';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import sizeFormat from '../../../../utils/sizeFormat';
import folder from '../../../../assets/folder.png';
import fileIcon from '../../../../assets/file.png';
import './File.css';

const File = ({file, iv, ckey}) => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);
  const fileView = useSelector(state => state.files.view);
  
  function openHandler () {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }

  const downloadClickHandler = (e) => {
    e.stopPropagation();
    downloadFile(file, iv[file.name], ckey[file.name]);
  }

  function deleteClickHandler(e) {
    e.stopPropagation();
    dispatch(deleteFile(file));
  }
  
  if(fileView === 'plate') {
    return (
      <div onClick={() => openHandler()} className='file'>
        <img src={file.type === 'dir' ? folder : fileIcon} alt='' style={{width: 70, height: 50}}/>
        <div>{file.name}</div>
        {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)}>download</button>}
        <button onClick={(e) => deleteClickHandler(e)}>delete</button>
      </div>
    )
  }

  if(fileView === 'list') {
    return (
      <div onClick={() => openHandler()} className='file'>
        <img src={file.type === 'dir'? folder : fileIcon} alt='' />
        <div>{file.name}</div>
        <div сlassName='date'>{file.date.slice(0, 10)}</div>
        <div сlassName='size'>{sizeFormat(file.size)}</div>
        {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)}>download</button>}
        <button onClick={(e) => deleteClickHandler(e)}>delete</button>
      </div>
    )
  }
}

export default File