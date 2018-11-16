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
        values: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        xE:[['NormaInf']],
        errorValues:[[]]
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
    // if (name.includes('a')) newState.results = {};
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
     this.runGaussSeidel();
   }
  }

  runJacobiAlgorithm = () => {
    let { n, m, a, b, initialVector, results, decimalAmount, errorDimension } = this.state;
    let sol = [], k = 0, c, i, j, suma, soltem = [m], aux = [m], matrixA = [];
    var condition = true;
    let matrizNormaInf = [[Math.max.apply(null, initialVector[0].map(v => parseInt(v, 10)))]];
    sol.push(initialVector[0].map(v => parseInt(v, 10)));

    for (c = 0; c < n; c++) {
      matrixA.push(a[c].map(v => parseInt(v, 10)));
      matrixA[c][m] = b[c][0]
    }
	  while(condition){
      for (i = 0; i < n; i++) {
        suma = 0;
        for (j = 0; j < m ; j++) {
          if (j === i) continue;
          suma += matrixA[i][j] * sol[k][j];
        }
        soltem[i] = (matrixA[i][m] - suma) / matrixA[i][i];
		    aux[i] = soltem[i] - sol[k][i];
      }
      var normInf = Math.max(...aux.map(value => Math.abs(value)));
      matrizNormaInf.push([normInf]);
      if(isNaN(normInf))
        break;
      if(normInf < errorDimension )
        condition = false;
      sol.push([]);
      k++;
      for (i = 0; i < n; i++){
        sol[k][i] = soltem[i].toFixed(decimalAmount);
      }
    }
    results.values = sol;
    results.available = true;
    results.errorValues = matrizNormaInf;
    const newState = _.set(this.state, 'results', results);
    this.setState(newState); 
    return;
  }

  runGaussSeidel = () => {
    let { n, m, initialVector, a, b, errorDimension, decimalAmount, results } = this.state;
    let k = 0;
    let i;
    let j;
    let suma;
    let matrizRes = [];
    matrizRes.push(initialVector[0].map(v => parseInt(v, 10)));
    let vector = [];
    for(j = 0; j < m; j++){
        vector.push(0);
    }
    let matrizNorma = [];
    let matrizNormaInf = [[Math.max.apply(null, initialVector[0].map(v => parseInt(v, 10)))]];
    matrizNorma.push(vector);
    do{
        k++;
        vector = [];
        for(i = 0; i < n; i++){
          vector.push(0);
        }
        matrizRes.push(vector);
        for(i = 0; i < n; i++){
          suma=0;  
            for(j = 0; j < m; j++){        
                if(j < i){
                  suma += -(a[i][j] * matrizRes[k][j]);
                }
                if( j > i){
                  suma += -(a[i][j] * matrizRes[k - 1][j]);
                }
            }
            matrizRes[k][i] = parseFloat((( suma + parseInt(b[i], 10)) / a[i][i]).toFixed(decimalAmount));
        }
        vector = [];
        for(j = 0; j < m; j++){
          vector.push(0);
        }
        matrizNorma.push(vector);
        for(j = 0; j < m; j++){
          matrizNorma[k][j] = Math.abs(matrizRes[k][j] - matrizRes[k - 1][j]);    
        }
        matrizNormaInf.push([Math.max.apply(null, matrizNorma[k]).toFixed(decimalAmount)]);
    }while(Math.max.apply(null, matrizNorma[k]) >= errorDimension);
    results.values = matrizRes;
    results.errorValues = matrizNormaInf;
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
            onChange={this.onChange}
            selectMethod={this.selectMethod}
          /> : null
        }
      </div>
    );
  }
}

export default App;
