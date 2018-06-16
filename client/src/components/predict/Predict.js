import React from "react"
import PropTypes from "prop-types"
import ImageUploader from "./ImageUploader"
import ImageUploaded from "./ImageUploaded"
import Prediction from "../prediction/connected/Prediction"

const Predict = ({ image, uploadImage, action }) => {
  return (
    <div>
      {image.uploaded ? (
        <ImageUploaded
          url={image.url}
          handleResetClick={() => action("RESET_IMAGE")}
        />
      ) : (
        <ImageUploader handleUpload={uploadImage} />
      )}
      {image.uploaded && <Prediction />}
    </div>
  )
}

Predict.propTypes = {
  image: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired
}

export default Predict
