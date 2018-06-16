import React from "react"
import PropTypes from "prop-types"
import Button from "../common/Button"

const ImageUploaded = ({ url, handleReset }) => {
  return (
    <div>
      <img src={url} />
      <Button
        type="secondary"
        label="Upload Another Image"
        onClick={handleReset}
      />
    </div>
  )
}

ImageUploaded.propTypes = {
  url: PropTypes.string.isRequired
}

export default ImageUploaded
