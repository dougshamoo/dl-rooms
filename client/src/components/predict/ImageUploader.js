import React, { Component, Fragment } from "react"
import Dropzone from "react-dropzone"

const ALLOWED_EXTENSIONS = ".png,.jpg,.jpeg"

const ImageUploader = props => {
  return (
    <div>
      <h1>Upload an Image</h1>
      <Dropzone
        multiple={false}
        accept={ALLOWED_EXTENSIONS}
        onDrop={files => props.handleUpload(files[0])}
      />
    </div>
  )
}

export default ImageUploader
