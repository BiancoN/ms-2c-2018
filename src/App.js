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
      initialVector: [[0]],
      a: [[0]],
      b: [[0]],
      x: [['X0']],
      results: {
        available: true,
        values: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        error: false,
        errorMessage: 'La matriz no es diagonalmente dominante. Reorganice filas o columnas para lograr esta condicion'
      }
    };
  }

  onBuildMatrix = () => {
    const { n, m } = this.state;
    let a = [], b = [], x = [], initialVector = [[]], i, j;
    for (i = 0; i < n; i++) {
      a[i] = [ ];
      b[i] = [0];
      initialVector[0][i] = [0];
      x[i] = [`X${i}`];
      for (j = 0; j < m; j++) {
        a[i][j] = 0;
      }
    }
    this.setState({ a, b, x, initialVector});
  }
  
  analyzeMatrix = () => {
    let { n, a} = this.state;
    let count = 0, i, j;
    for (i = 0; i < n; i++) {         
      let sum = 0; 
      for (j = 0; j < n; j++){              
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
    const { n, m, initialVector, a, b, x, results, matrix_analysis } = this.state;
    return (
      <div>
        <Initialization
          n={n} m={m} a={a} b={b} x={x} matrix_analysis={matrix_analysis}
          onChange={this.onChange}
          onBuildMatrix={this.onBuildMatrix}
          analyzeMatrix={this.analyzeMatrix}
          />
        { (matrix_analysis == 'dominant' || matrix_analysis == 'strict') ? 
          <Algorithm 
          results={results} x={x} initialVector={initialVector} 
          runJacobiAlgorithm={this.runJacobiAlgorithm} 
          onChangeInitialVector={this.onChangeInitialVector}
          /> :null
        }
      </div>
    );
  }
}

export default App;
