import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, downloadFile } from '../../../../actions/file';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';

const File = ({file}) => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);

  function openHandler () {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }
  const downloadClickHandler = (e) => {
    e.stopPropagation();
    downloadFile(file);
  }
  function deleteClickHandler(e) {
    e.stopPropagation();
    dispatch(deleteFile(file));
  }
  return (
    <div onClick={() => openHandler()}>
      <img src='' alt=''/>
      <div>{file.name}</div>
      <div>{file.date.slice(0,10)}</div>
      <div>{file.size}</div>
      {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)}>download</button>}
      <button onClick={(e) => deleteClickHandler(e)}>delete</button>
    </div>
  )
}

export default File