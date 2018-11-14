import React from 'react';

const analyzeMatrix = (a, onAnalyze) => {
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
  onAnalyze(canCalculate, result);
}

const Analysis = ({ a, onAnalyze, message }) => (
  <div className="Step">
    <h3>Para aplicar algun metodo es necesario que la matriz de coeficientes sea analizada:</h3>
    <div className="AnalysisContainer">
      <div className="ButtonContainer" onClick={() => analyzeMatrix(a, onAnalyze)}>
        <p>Analizar</p>
      </div>
      <h4>{message}</h4>
    </div>
    <div className="SimpleLine" />
  </div>
);

export default Analysis;
