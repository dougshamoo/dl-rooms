import React from "react"
import { Container, RouteLink, HomeLink } from "./styled/header"

const Header = () => (
  <Container>
    <HomeLink to="/">🏠 Deep Learning: Rooms of a House</HomeLink>
    <RouteLink to="/predict">Predict</RouteLink>
    <RouteLink to="/about">About</RouteLink>
  </Container>
)

export default Header
