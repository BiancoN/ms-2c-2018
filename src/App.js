import React, { Component } from 'react';
import _ from 'lodash';
import Initialization from './steps/Initialization';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      step: 0,
      n: 1,
      m: 1,
      a: [[0]],
      b: [[0]]
    };
  }

  onChange = event => {
    const { name, value } = event.target;
    const newState = _.set(this.state, name, value);
    this.setState(newState);
  }

  render() {
    const { n, m, a, b } = this.state;
    return (
      <div className="App">
        <Initialization n={n} m={m} a={a} b={b} onChange={this.onChange} />
      </div>
    );
  }
}

export default App;
