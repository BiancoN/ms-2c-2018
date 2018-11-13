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
      a: [[0]],
      b: [[0]],
      x: [['X0']],
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
    let { n, a} = this.state;
    let count = 0;
    for ( let i = 0; i < n; i++) {         
      let sum = 0; 
      for ( let j = 0; j < n; j++){              
        sum += Math.abs(a[i][j]);         
      }
      sum -= Math.abs(a[i][i]); 
      if (Math.abs(a[i][i]) < sum){
        this.setState({matrix_analysis: 'nothing'});
        return false;  
      }
      if (Math.abs(a[i][i]) > sum)
        count += 1;
    } 
    if(count == n){
      this.setState({matrix_analysis: 'strict'});
    }else{
      this.setState({matrix_analysis: 'dominant'});
    }
    return true; 
  }

  onChange = event => {
    const { name, value } = event.target;
    const newState = _.set(this.state, name, value);
    this.setState(newState);
    this.setState({matrix_analysis: ''});
  }

  runJacobiAlgorithm = () => {
    debugger;
    // public string Jacobi(double[,] matriz, int filas, int columnas){
    //     double[] sol = new double[filas];
    //     double[] soltem = new double[filas];
    //     StringBuilder sb = new StringBuilder();
    //     for (int iteraciones = 0; iteraciones < 3; iteraciones++)
    //     {
    //         for (int i = 0; i < filas; i++)
    //         {
    //             double suma = 0;
    //             for (int j = 0; j < columnas - 1; j++)
    //             {
    //                 if (j == i) continue;
    //                 suma += matriz[i, j] * sol[j];
    //             }
    //             soltem[i] = (matriz[i, columnas - 1] - suma) / matriz[i, i];
    //         }
    //         for (int i = 0; i < filas; i++)
    //         {
    //             sol[i] = soltem[i];
    //             sb.AppendLine("X" + (i + 1) + " = " + sol[i]);
    //         }
    //         sb.AppendLine();
    //     }
    //     return sb.ToString();
    // }
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
        { (matrix_analysis == 'dominant' || matrix_analysis == 'strict') ? 
          <Algorithm  results={results} x={x} runJacobiAlgorithm={this.runJacobiAlgorithm} /> :null
        }
      </div>
    );
  }
}

export default App;
