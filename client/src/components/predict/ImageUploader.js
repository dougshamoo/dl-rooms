import React, { Component, Fragment } from "react"
import Dropzone from "react-dropzone"
import { Container } from "./styled/imageUploader"

const ALLOWED_EXTENSIONS = ".png,.jpg,.jpeg"

const ImageUploader = props => {
  return (
    <Container>
      <h3>Upload an Image</h3>
      <Dropzone
        multiple={false}
        accept={ALLOWED_EXTENSIONS}
        onDrop={files => props.handleUpload(files[0])}
      />
    </Container>
  )
}

export default ImageUploader
