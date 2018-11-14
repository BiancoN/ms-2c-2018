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
      initialVector: [[0]],
      a: [[0]],
      b: [[0]],
      x: [['X0']],
      results: {
        isDiagonallyDominant: false,
        message: '',
        available: true,
        values: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
      }
    };
  }

  onBuildMatrix = () => {
    const { n, m } = this.state;
    let a = [], b = [], x = [], initialVector = [[]], i, j;
    for (i = 0; i < n; i++) {
      b[i] = [0];
      a[i] = [ ];
      initialVector[0][i] = [0];
      for (j = 0; j < m; j++) {
        a[i][j] = 0;
        if (i === 0) x[j] = [`X${j}`];
      }
    }
    this.setState({ a, b, x, results: {}, initialVector});
  }

  onAnalyze = (isDiagonallyDominant, message, norms) => {
    const results = { isDiagonallyDominant, message, norms };
    this.setState({ results });
  }

  onChange = event => {
    const { name, value } = event.target;
    const newState = _.set(this.state, name, value);
    if (name.includes('a')) newState.results = {};
    this.setState(newState);
  }

  onChangeInitialVector = event => {
    const { name, value } = event.target;
    const newState = _.set(this.state, name, value);
    this.setState(newState);
  }

  runJacobiAlgorithm = () => {
    let { n, m, a, b, initialVector} = this.state;
    let sol = initialVector[0], soltem = [m];
    let c, iteraciones, i, j, suma;
    // Add matrix b like a column in matrix a
    for (c = 0; c < n; c++) {
      a[c][m] = b[c][0]
    }
    for (iteraciones = 0; iteraciones < 3; iteraciones++){
      for (i = 0; i < n; i++) {
          suma = 0;
          for (j = 0; j < m - 1; j++) {
            if (j == i) continue;
            suma += a[i][j] * sol[j];
          }
          soltem[i] = (a[i][m - 1] - suma) / a[i][i];
      }
      for (i = 0; i < n; i++){
        sol[i] = soltem[i];
        console.log("X" + (i + 1) + " = " + sol[i]);
      }
    }
    return;

    // Function in c#
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
    //             su[i] = soltem[i];
    //             sb.AppendLine("X" + (i + 1) + " = " + sol[i]);
    //         }
    //         sb.AppendLine();
    //     }
    //     return sb.ToString();
    // }
  }

  render() {
    const { n, m, a, b, x, results, initialVector } = this.state;
    return (
      <div>
        <Initialization
          n={n} m={m} a={a} b={b} x={x}
          onChange={this.onChange}
          onBuildMatrix={this.onBuildMatrix}
        />
        <Analysis
          norms={results.norms} a={a}
          message={results.message}
          onAnalyze={this.onAnalyze}
        />
        {
          results.isDiagonallyDominant ?
          <Algorithm
            results={results} x={x} initialVector={initialVector}
            runJacobiAlgorithm={this.runJacobiAlgorithm}
            onChangeInitialVector={this.onChangeInitialVector}
          /> : null
        }
      </div>
    );
  }
}

export default App;
