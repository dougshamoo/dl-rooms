import React from "react"
import PropTypes from "prop-types"
import ResultsChart from "./ResultsChart"
import { Body } from "./styled/results"

const Results = ({ predictedClass, probsByClass }) => {
  return (
    <div>
      <h1>Results</h1>
      <Body>
        <h2>Prediction: {predictedClass.replace("_", " ")}</h2>
        <ResultsChart probsByClass={probsByClass} />
      </Body>
    </div>
  )
}

Results.propTypes = {
  predictedClass: PropTypes.string.isRequired,
  probsByClass: PropTypes.object.isRequired
}

export default Results
