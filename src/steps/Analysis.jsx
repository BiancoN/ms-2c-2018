import React from 'react';
import math from 'mathjs';
import numeric from 'numeric';
math.import(numeric, { wrap: true, silent: true });

const transpone = matrix => {
  const n = matrix.length, m = matrix[0].length;
  const transposed = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (transposed.length < m) {
        transposed[j] = [matrix[i][j]];
      } else {
        transposed[j][i] = matrix[i][j];
      }
    }
  }
  return transposed;
};

const calculateTargetMatrix = a => a.map(aRow => a.map(bColumn =>
  aRow.reduce((accum, value, index) => accum + (value * bColumn[index]), 0)));

const eigenValues = matrix => {
  if (matrix.length === 1) return matrix[0];
  const matrixStr = matrix.reduce((accum, row, index) =>
    accum.concat(row.reduce((rowAccum, value, columnIndex) =>
      rowAccum.concat(
        value,
        row.length - 1 === columnIndex ? '' : ','
      ), ''),
      index === matrix.length - 1 ? ']' : ';'
    ), '[');
  return math.eval(`eig(${matrixStr})`).lambda.x;
};

const calculateNorms = matrix => {
  const norm1 = Math.max(...matrix.reduce(
    (accum, row) => row.map(
      (value, index) => Math.abs(value) + (accum[index] || 0)), []));

  let allZero = true;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if(matrix[i][j] !== 0) {
        allZero = false;
        break;
      }
    }
  } 

  let a = 0;
  if(!allZero){
    a = Math.sqrt(Math.max(...eigenValues(calculateTargetMatrix(transpone(matrix)))));
  }
  const norm2 = a;

  const normInf = Math.max(...matrix.map(
    row => row.reduce((accum, value) => accum + Math.abs(value), 0)));

    return { norm1, norm2, normInf };
};

const analyzeMatrix = (a, onAnalyze) => {
  const norms = calculateNorms(a);
  const n = a.length, m = a[0].length;
  let result = 'La matriz es estrictamente dominante diagonalmente';
  let canCalculate = false;
  if (n !== m){
    result = 'La matriz de coeficientes debe ser cuadrada';  
  } else  {
    canCalculate = true;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if(i === j && a[i][j] === 0){
          result = 'La matriz no puede tener ceros en su diagonal.';
          canCalculate = false;
          break;
        }
      }
    }
    if(canCalculate){
      for (let i = 0; i < n; i++) {
        const { diagonal, sum } = a[i].reduce((accum, value, j) => {
          if (i === j) accum.diagonal = Math.abs(value);
          else accum.sum += Math.abs(value);
          return accum;
        }, { diagonal: 0, sum: 0 });
        if (diagonal === sum) {
          result = 'La matriz es dominante diagonalmente. Reorganice (si es posible) filas o columnas para lograr esta condición.';
        } else if (diagonal < sum) {
          result = 'La matriz no es dominante diagonalmente. Reorganice (si es posible) filas o columnas para lograr esta condición.';
          canCalculate = false;
          break;
        }
      }
    }
  }
  onAnalyze(canCalculate, result, norms);
};

const Analysis = ({ a, onAnalyze, message, norms }) => (
  <div className="Step">
    <span className="MarginVertical AlignStart">Para aplicar algun método es necesario que la matriz de coeficientes sea analizada.</span>
    <div className="AnalysisContainer">
      <div className="ButtonContainer MarginVertical" onClick={() => analyzeMatrix(a, onAnalyze)}>
        <p>Analizar</p>
      </div>
      <h4>{message}</h4>
    </div>
    {
      norms &&
      <div className="NormsContainer">
        <p>Norma 1 = {norms.norm1}</p>
        <p>Norma 2 = {norms.norm2}</p>
        <p>Norma Infinito = {norms.normInf}</p>
      </div>
    }
    <div className="SimpleLine" />
  </div>
);

export default Analysis;
