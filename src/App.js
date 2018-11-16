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
      initialVector: [[]],
      a: [[0]],
      b: [[0]],
      x: [['X0']],
      method: '',
      errorDimension: 1,
      decimalAmount: 1,
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
    let a = [], b = [], x = [], initialVector = [[]], i, j, method;
    method = '';
    for (i = 0; i < n; i++) {
      b[i] = [0];
      a[i] = [ ];
      initialVector[0][i] = [0];
      for (j = 0; j < m; j++) {
        a[i][j] = 0;
        if (i === 0) x[j] = [`X${j}`];
      }
    }
    this.setState({ a, b, x, method, results: {}, initialVector});
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

  selectMethod = event => {
    const newState = _.set(this.state, 'method', event);
    this.setState(newState);
  }

  resolveMatrix = () => {
   let { method} = this.state;
   if(method === 'jacobi'){
    this.runJacobiAlgorithm();
   }
   if(method === 'gauss-seidel'){
     this.runGaussSeiden();
   }
  }

  runJacobiAlgorithm = () => {
    let { n, m, a, b, initialVector, results } = this.state;
    let sol = initialVector[0].slice();
    let c, iteraciones, i, j, suma, soltem = [m];
    // Add matrix b like a column in matrix a
    for (c = 0; c < n; c++) {
      a[c][m] = b[c][0]
    }
    for (iteraciones = 0; iteraciones < 3; iteraciones++){
      for (i = 0; i < n; i++) {
          suma = 0;
          for (j = 0; j < m ; j++) {
            if (j === i) continue;
            suma += a[i][j] * sol[j];
          }
          soltem[i] = (a[i][m] - suma) / a[i][i];
      }
      for (i = 0; i < n; i++){
        sol[i] = soltem[i];
      }
    }
    results.values = sol;
    results.available = true;
    const newState = _.set(this.state, 'results', results);
    this.setState(newState); 
    return;
  }

  runGaussSeiden = () => {
    let { n, m, initialVector, a, b, x, method, errorDimension, decimalAmount, results } = this.state;
    let k = 0;
    let i;
    let j;
    let suma;
    let matrizRes = [];
    matrizRes.push(initialVector[0])
    let vector = [];
    for(j = 0; j < m; j++){
        vector.push(0);
    }
    let matrizNorma = [];
    matrizNorma.push(vector);
    do{    
        k++;
        matrizRes.push(vector);
        suma = 0;
        for(i = 0; i < n; i++){    
            for(j = 0; j < m; j++){        
                if(j < i){
                    suma += -(a[i][j] * parseInt(matrizRes[k][j], 10));
                }
                if( j > i){
                    suma += -(a[i][j] * parseInt(matrizRes[k - 1][j], 10));
                }
            }
            console.log("suma:", suma);
            console.log("termino independiente:", parseInt(b[i], 10));
            console.log("Coeficiente considerado:", a[i][i]); 
            console.log("Valor a agregar:", (( suma + parseInt(b[i], 10) ) / a[i][i]));
            matrizRes[k][i] = Math.round((( suma + parseInt(b[i], 10) ) / a[i][i]) + "e+" + decimalAmount) + "e-" + decimalAmount;
        }
        console.log(matrizRes[k]);
        for(j = 0; j < m; j++){
          matrizNorma.push(vector);
          matrizNorma[k][j] = Math.abs(matrizRes[k][j] - matrizRes[k - 1][j]);    
        }
    }while(Math.max.apply(null, matrizNorma[k]) > errorDimension);
    results.values = matrizRes;
    results.available = true;
    const newState = _.set(this.state, 'results', results);
    this.setState(newState); 
    return;
  }

  render() {
    const { n, m, a, b, x, method, errorDimension, decimalAmount, results, initialVector } = this.state;
    return (
      <div>
        <Initialization
          n={n} m={m} a={a} b={b} x={x} method={method}
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
            results={results} x={x} initialVector={initialVector} method={method} decimalAmount={decimalAmount} errorDimension={errorDimension}
            resolveMatrix={this.resolveMatrix}
            onChangeInitialVector={this.onChangeInitialVector}
            selectMethod={this.selectMethod}
          /> : null
        }
      </div>
    );
  }
}

export default App;
