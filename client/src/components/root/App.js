import React from "react"
import { Switch, Route } from "react-router-dom"
import Header from "./Header"
import Home from "../routes/Home"
import Predict from "../routes/Predict"
import About from "../routes/About"
import { Container, Body } from "./styled/app"

const App = () => (
  <Container>
    <Header />
    <Body>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/predict" component={Predict} />
        <Route path="/about" component={About} />
      </Switch>
    </Body>
  </Container>
)

export default App
