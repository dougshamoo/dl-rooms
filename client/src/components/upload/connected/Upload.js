import React from "react"
import { connect } from "react-redux"
import { uploadImage } from "../../../actions/image"
import Upload from "../Upload"

function select() {
  return {}
}

const actions = {
  uploadImage
}

export default connect(
  select,
  actions
)(Upload)
