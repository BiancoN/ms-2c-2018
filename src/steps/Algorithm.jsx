import React from 'react';

const Algorithm = ({ runJacobiAlgorithm, runGaussSeidelAlgorithm, results }) => (
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
  </div>
);

export default Algorithm;
