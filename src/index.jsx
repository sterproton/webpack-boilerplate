import React from 'react'
import reactDom from 'react-dom'
import { Provider } from 'react-redux'
import Route from './router/router'
import store from './redux/store'

const app = document.getElementById('app')

if (module.hot) {
  reactDom.unmountComponentAtNode(app)
  module.hot.accept()
}

reactDom.render(
  <Provider store={store}>
    <Route />
  </Provider>, app)
