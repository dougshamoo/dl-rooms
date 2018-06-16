import React from "react"
import PropTypes from "prop-types"
import { Container } from "./styled/button"

const Button = ({ type, label, onClick }) => {
  return (
    <Container type={type} onClick={onClick}>
      {label}
    </Container>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["primary", "secondary", "danger"])
}

export default Button
