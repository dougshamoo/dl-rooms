import React from "react"
import PropTypes from "prop-types"
import { Container } from "./styled/button"

const Button = ({ type, label, handleClick }) => {
  return (
    <Container type={type} onClick={handleClick}>
      {label}
    </Container>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func,
  type: PropTypes.oneOf(["primary", "secondary", "danger"])
}

export default Button
