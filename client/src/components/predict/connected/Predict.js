import { connect } from "react-redux"
import { uploadImage } from "../../../actions/image"
import Predict from "../Predict"
import { action } from "../../../utils/redux"

function select({ image }) {
  return { image }
}

const actions = {
  uploadImage,
  action
}

export default connect(
  select,
  actions
)(Predict)
