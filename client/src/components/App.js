import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Upload from './upload/connected/Upload'
import About from './About'
import { Container, Body } from './styled/app'

const App = () => (
  <Container>
    <Header />
    <Body>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/upload' component={Upload} />
        <Route path='/about' component={About} />
      </Switch>
    </Body>
  </Container>
)

export default App