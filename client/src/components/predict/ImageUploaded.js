import React from "react"
import PropTypes from "prop-types"
import Button from "../common/Button"

const ImageUploaded = ({ url, handleResetClick }) => {
  return (
    <div>
      <img src={url} />
      <Button
        type="secondary"
        label="Upload Another Image"
        onClick={handleResetClick}
      />
    </div>
  )
}

ImageUploaded.propTypes = {
  url: PropTypes.string.isRequired,
  handleResetClick: PropTypes.func.isRequired
}

export default ImageUploaded
