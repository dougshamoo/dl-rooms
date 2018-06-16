import React from "react"
import PropTypes from "prop-types"
import ImageUploader from "./ImageUploader"
import ImageUploaded from "./ImageUploaded"
import Prediction from "../prediction/connected/Prediction"

const Upload = ({ image, uploadImage, resetImage }) => {
  return (
    <div>
      {image.uploaded ? (
        <ImageUploaded url={image.url} handleReset={resetImage} />
      ) : (
        <ImageUploader handleUpload={uploadImage} />
      )}
      {image.uploaded && <Prediction />}
    </div>
  )
}

Upload.propTypes = {
  image: PropTypes.object.isRequired
}

export default Upload
