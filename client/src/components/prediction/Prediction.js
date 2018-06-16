import React from "react"
import PropTypes from "prop-types"

const Prediction = ({ predictedClass, probsByClass }) => {
  return (
    <div>
      <h1>Results</h1>
      <h2>{predictedClass}</h2>
      <pre>{JSON.stringify(probsByClass, null, 2)}</pre>
    </div>
  )
}

Prediction.propTypes = {
  predictedClass: PropTypes.string.isRequired,
  probsByClass: PropTypes.object.isRequired
}

export default Prediction
