import { connect } from "react-redux"
import Results from "../Results"

function select({ image }) {
  return {
    predictedClass: image.predictedClass,
    probsByClass: image.probsByClass
  }
}

export default connect(select)(Results)
