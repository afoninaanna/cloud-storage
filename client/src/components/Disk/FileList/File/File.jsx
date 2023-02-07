import React from 'react'

const File = ({file}) => {
  return (
    <div>
      <img src='' alt=''/>
      <div>{file.name}</div>
      <div>{file.date.slice(0,10)}</div>
      <div>{file.size}</div>
    </div>
  )
}

export default File