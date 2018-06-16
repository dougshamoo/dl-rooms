import React from "react"
import { connect } from "react-redux"
import { uploadImage } from "../../../actions/image"
import Upload from "../Upload"

function select({ image }) {
  return { image }
}

const actions = {
  uploadImage,
  resetImage: { type: "RESET_IMAGE" }
}

export default connect(
  select,
  actions
)(Upload)
