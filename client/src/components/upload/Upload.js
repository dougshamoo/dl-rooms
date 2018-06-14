import React from 'react'
import ImageUploader from './ImageUploader'

const Upload = props => {
  return (
    <div>
      <h1>Upload an Image</h1>
      <ImageUploader handleUpload={props.uploadImage} />
    </div>
  )
}

export default Upload