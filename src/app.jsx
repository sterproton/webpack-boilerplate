import 'purecss'
import React, { Component } from 'react'
import './scss/index.scss'
import Info from './components/Info'

class App extends Component {
  state = {
    greeting: null,
    lazyComponent: null,
    hasLazy: false,
  }

  async componentDidMount() {
    const res = await 'hello'
    this.transInfo(res)
  }

  transInfo = (info) => {
    this.setState({
      greeting: info,
    })
  }

  info = {
    name: 'name',
    age: 18,
    birthday: '1900.1.1',
  }

  toggleLazy = async () => {
    if (!this.state.hasLazy) {
      const component = await import('./components/Lazy.jsx')
      this.setState(prev => ({
        hasLazy: !prev.hasLazy,
        lazyComponent: component.default(),
      }))
    } else {
      this.setState(prev => ({
        hasLazy: !prev.hasLazy,
        lazyComponent: null,
      }))
    }
  }

  render() {
    return (
      <div className="container">
        this is a greeting: {this.state.greeting}
        <Info {...this.info} />
        <button onClick={this.toggleLazy} >toggle lazy component</button>
        <div className="lazy-component">{this.state.lazyComponent}</div>
      </div>
    )
  }
}

export default App
