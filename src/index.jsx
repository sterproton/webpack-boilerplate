import React from 'react'
import reactDom from 'react-dom'
import App from './app'

const app = document.getElementById('app')

if (module.hot) {
  reactDom.unmountComponentAtNode(app)
  module.hot.accept()
}

reactDom.render(<App />, app)
