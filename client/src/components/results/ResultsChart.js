import React from "react"
import PropTypes from "prop-types"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts"
import { getColorForRoom } from "../../utils/colors"

const ResultsChart = ({ probsByClass }) => {
  const data = Object.entries(probsByClass).map(tuple => {
    return { room: tuple[0], score: tuple[1] }
  })
  return (
    <div>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="room" />
        <YAxis dataKey="score" />
        <Bar dataKey="score">
          {data.map(entry => {
            return <Cell key={entry.room} fill={getColorForRoom(entry.room)} />
          })}
        </Bar>
      </BarChart>
      <pre>{JSON.stringify(probsByClass, null, 2)}</pre>
    </div>
  )
  // {data.map(item => (
  //   <Bar key={item.name} dataKey={item.score} fill="blue" />
  // ))}
}

const RoomBar = ({}) => {
  return <Bar />
}

ResultsChart.propTypes = {
  probsByClass: PropTypes.object.isRequired
}

export default ResultsChart
