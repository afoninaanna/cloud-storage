import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';

const File = ({file}) => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);

  function openHandler () {
    dispatch(pushToStack(currentDir));
    dispatch(setCurrentDir(file._id));
  }
  return (
    <div onClick={file.type === 'dir' ? () => openHandler() : ''}>
      <img src='' alt=''/>
      <div>{file.name}</div>
      <div>{file.date.slice(0,10)}</div>
      <div>{file.size}</div>
    </div>
  )
}

export default File