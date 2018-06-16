import React from "react"
import { connect } from "react-redux"
import Prediction from "../Prediction"

function select({ image }) {
  return {
    predictedClass: image.predictedClass,
    probsByClass: image.probsByClass
  }
}

// const actions = {
//   uploadImage
// }

export default connect(
  select
  // actions
)(Prediction)
