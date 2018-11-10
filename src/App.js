import React, { Component } from 'react';
import _ from 'lodash';
import Initialization from './steps/Initialization';
import Algorithm from './steps/Algorithm';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      matrix_analysis: '',
      step: 0,
      n: 1,
      m: 1,
      a: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      b: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      x: [['X0'], ['X1'], ['X2']],
      results: {
        available: true,
        values: [[0.231423123, 0.231423123, 0.231423123], [0, 0, 0], [0, 0, 0]],
        error: false,
        errorMessage: 'La matriz no es diagonalmente dominante. Reorganice filas o columnas para lograr esta condicion'
      }
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

  analyzeMatrix = () => {
    let { n, a, matrix_analysis} = this.state;
    for ( let i = 0; i < n; i++) {         
      let sum = 0; 
      for ( let j = 0; j < n; j++){              
        sum += Math.abs(a[i][j]);         
      }
      sum -= Math.abs(a[i][i]); 
      if (Math.abs(a[i][i]) < sum){
        matrix_analysis = 'nothing';
        this.setState({matrix_analysis});
        return false;  
      }
    } 
    matrix_analysis = 'dominant';
    this.setState({matrix_analysis});
    return true; 
  }

  onChange = event => {
    const { name, value } = event.target;
    const newState = _.set(this.state, name, value);
    this.setState(newState);
  }

  render() {
    const { n, m, a, b, x, results, matrix_analysis } = this.state;
    return (
      <div>
        <Initialization
          n={n} m={m} a={a} b={b} x={x} matrix_analysis={matrix_analysis}
          onChange={this.onChange}
          onBuildMatrix={this.onBuildMatrix}
          analyzeMatrix={this.analyzeMatrix}
        />
        <Algorithm results={results} x={x} />
      </div>
    );
  }
}

export default App;
