import React from "react"
import PropTypes from "prop-types"
import ImageUploader from "./ImageUploader"
import ImageUploaded from "./ImageUploaded"
import Results from "../results/connected/Results"

const Predict = ({ image, uploadImage, action }) => {
  return (
    <div>
      <h1>Predict</h1>
      {image.uploaded ? (
        <ImageUploaded
          url={image.url}
          handleResetClick={() => action("RESET_IMAGE")}
        />
      ) : (
        <ImageUploader handleUpload={uploadImage} />
      )}
      {image.uploaded && <Results />}
    </div>
  )
}

Predict.propTypes = {
  image: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired
}

export default Predict
