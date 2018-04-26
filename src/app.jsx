import React, { Component } from 'react';
import './scss/test.scss'
import Info from './components/Info'

class App extends Component {
  
  state = {
    greeting: null
  }

  info = {
    name: 'test',
    age : 16,
    birthday: '1.1'
  }

  async componentDidMount(){
    const res = await 'hello'
    this.setState({
      greeting: res
    })
  }

  render() {
    return (
      <div className={'container'}>
        hello,webpack, this is a async greeting{this.state.greeting}
        <Info {...this.info}/>
      </div>
    );
  }
}

export default App;