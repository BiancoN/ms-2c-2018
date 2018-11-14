import React, { Component } from 'react';
import _ from 'lodash';
import Initialization from './steps/Initialization';
import Analysis from './steps/Analysis';
import Algorithm from './steps/Algorithm';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      n: 1,
      m: 1,
      a: [[0]],
      b: [[0]],
      x: [['X0']],
      results: {
        isDiagonallyDominant: false,
        message: '',
        available: true,
        values: [[0.231423123, 0.231423123, 0.231423123], [0, 0, 0], [0, 0, 0]]
      }
    };
  }

  onBuildMatrix = () => {
    const { n, m } = this.state;
    let a = [], b = [], x = [], i, j;
    for (i = 0; i < n; i++) {
      b[i] = [0];
      a[i] = [ ];
      for (j = 0; j < m; j++) {
        a[i][j] = 0;
        if (i === 0) x[j] = [`X${j}`];
      }
    }
    this.setState({ a, b, x, results: {} });
  }

  onAnalyze = (isDiagonallyDominant, message) => {
    const results = { isDiagonallyDominant, message };
    this.setState({ results });
  }

  onChange = event => {
    const { name, value } = event.target;
    const newState = _.set(this.state, name, value);
    if (name.includes('a')) newState.results = {};
    this.setState(newState);
  }

  render() {
    const { n, m, a, b, x, results } = this.state;
    return (
      <div>
        <Initialization
          n={n} m={m} a={a} b={b} x={x}
          onChange={this.onChange}
          onBuildMatrix={this.onBuildMatrix}
        />
        <Analysis
          a={a} message={results.message}
          onAnalyze={this.onAnalyze}
        />
        {results.isDiagonallyDominant ? <Algorithm results={results} x={x} />: null}
      </div>
    );
  }
}

export default App;
