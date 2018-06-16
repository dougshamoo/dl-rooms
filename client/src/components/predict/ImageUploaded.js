import React from "react"
import PropTypes from "prop-types"
import Button from "../common/Button"
import { Container, Image } from "./styled/imageUploaded"

const ImageUploaded = ({ url, handleResetClick }) => {
  return (
    <Container>
      <Image src={url} />
      <Button
        type="primary"
        label="Upload Another Image"
        onClick={handleResetClick}
      />
    </Container>
  )
}

ImageUploaded.propTypes = {
  url: PropTypes.string.isRequired,
  handleResetClick: PropTypes.func.isRequired
}

export default ImageUploaded
