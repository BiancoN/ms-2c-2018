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
      b: [[0]],
      x: [['X0']]
    };
  }

  onBuildMatrix = () => {
    const { n, m } = this.state;
    let a = [], b = [], x = [], i, j;
    for (i = 0; i < n; i++) {
      a[i] = [ ];
      b[i] = [0];
      x[i] = [`X${i}`];
      for (j = 0; j < m; j++) {
        a[i][j] = 0;
      }
    }
    this.setState({ a, b, x });
  }

  onChange = event => {
    const { name, value } = event.target;
    const newState = _.set(this.state, name, value);
    this.setState(newState);
  }

  render() {
    const { n, m, a, b, x } = this.state;
    return (
      <Initialization
        n={n} m={m} a={a} b={b} x={x} 
        onChange={this.onChange}
        onBuildMatrix={this.onBuildMatrix}
      />
    );
  }
}

export default App;
