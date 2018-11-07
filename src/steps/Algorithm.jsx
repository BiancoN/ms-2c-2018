import React from 'react';
import Table from '../components/Table';

const Algorithm = ({ runJacobiAlgorithm, runGaussSeidelAlgorithm, results, x }) => (
  <div className="Step">
    <h3>Seleccione el metodo de resolucion a utilizar:</h3>
    <div className="ButtonsContainer">
      <div className="Button" onClick={runJacobiAlgorithm}>
        <p>Jacobi</p>
      </div>
      <div className="Button" onClick={runGaussSeidelAlgorithm}>
        <p>Gauss-Seidel</p>
      </div>
    </div>
    <div className="SimpleLine" />
    {
      results.error &&
      <p className="ErrorMessage">
        {results.errorMessage}
      </p>
    }
    {
      results.available &&
      <div className="ResultsContainer">
        <h3>Resultados:</h3>
        <Table values={results.values} x={x} />
      </div>
    }
  </div>
);

export default Algorithm;
