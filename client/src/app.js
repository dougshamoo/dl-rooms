import React from "react"
import thunk from "redux-thunk"
import { render } from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"
import { createLogger } from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"
import App from "./components/App"
import rootReducer from "./reducers"
import "./utils/normalize"

const logger = createLogger({ level: "info", collapsed: true })
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk, logger))
)

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
)
