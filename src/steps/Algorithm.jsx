import React from 'react';
import Table from '../components/Table';
import Matrix from '../components/Matrix';

const Algorithm = ({ runJacobiAlgorithm, runGaussSeidelAlgorithm, results, x, initialVector, onChangeInitialVector }) => (
  <div className="Step">
    <h3 className="TextCenter Underline">Método de resolución </h3>
    <span className="MarginVertical">Seleccione el método de resolución a utilizar:</span>
    <div className="ButtonsContainer">
      <div className="Button" onClick={runJacobiAlgorithm}>
        <p>Jacobi</p>
      </div>
      <div className="Button" onClick={runGaussSeidelAlgorithm}>
        <p>Gauss-Seidel</p>
      </div>
    </div>

    <span className="MarginVertical">Seleccione el vector inicial:</span>
    <div className="MatrixesContainer">
      <Matrix name="initialVector" values={initialVector} onChange={onChangeInitialVector}/>
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
