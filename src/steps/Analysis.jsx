import React from 'react';

const calculateNorms = matrix => {
  const norm1 = Math.max(...matrix.reduce(
    (accum, row) => row.map(
      (value, index) => Math.abs(value) + (accum[index] || 0)), []));

  const norm2 = 0;

  const normInf = Math.max(...matrix.map(
    row => row.reduce((accum, value) => accum + Math.abs(value), 0)));

    return { norm1, norm2, normInf };
};

const analyzeMatrix = (a, onAnalyze) => {
  const norms = calculateNorms(a);
  const n = a.length, m = a[0].length;
  let result = 'La matriz es estrictamente dominante diagonalmente';
  let canCalculate = false;
  if (n !== m) result = 'La matriz de coeficientes debe ser cuadrada';
  else {
    canCalculate = true;
    for (let i = 0; i < n; i++) {
      const { diagonal, sum } = a[i].reduce((accum, value, j) => {
        if (i === j) accum.diagonal = Math.abs(value);
        else accum.sum += Math.abs(value);
        return accum;
      }, { diagonal: 0, sum: 0 });
      if (diagonal === sum) {
        result = 'La matriz es dominante diagonalmente';
      } else if (diagonal < sum) {
        result = 'La matriz no es dominante diagonalmente. Reorganice filas o columnas para lograr esta condicion';
        canCalculate = false;
        break;
      }
    }
  }
  onAnalyze(canCalculate, result, norms);
};

const Analysis = ({ a, onAnalyze, message, norms }) => (
  <div className="Step">
    <span className="MarginVertical">Para aplicar algun método es necesario que la matriz de coeficientes sea analizada.</span>
    <div className="AnalysisContainer">
      <div className="ButtonContainer" onClick={() => analyzeMatrix(a, onAnalyze)}>
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
