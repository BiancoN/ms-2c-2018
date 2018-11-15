import React from 'react';
import Table from '../components/Table';
import Matrix from '../components/Matrix';
import Input from '../components/Input';

const Algorithm = ({ selectMethod, resolveMatrix, results, x, method, initialVector, onChangeInitialVector, decimalAmount, errorDimension }) => (
  <div className="Step">
    <h3 className="TextCenter Underline">Método de resolución </h3>
    <span className="MarginVertical AlignStart">Seleccione el método de resolución a utilizar:</span>
    <div className="ButtonsContainer">
      <div className={`Button ${method=='jacobi'? 'IsActive':''}`} onClick={()=>selectMethod('jacobi')}>
        <p>Jacobi</p>
      </div>
      <div className={`Button ${method=='gauss-seidel'?'IsActive':''}`} onClick={()=>selectMethod('gauss-seidel')}>
        <p>Gauss-Seidel</p>
      </div>
    </div>
    {
      method &&
      <div className="AnalysisContainer MarginVertical">
        <div className="MatrixesContainer">
          <span className="MarginVertical AlignStart">Indique el vector inicial:</span>
          <Matrix name="initialVector" values={initialVector} onChange={onChangeInitialVector}/>
        </div>
        <div className="MatrixesContainer">
          <span className="MarginVertical">Indique la cantidad de decimales:</span>
          <Input name="decimalAmount"  value={decimalAmount} />
        </div>
        <div className="MatrixesContainer">
          <span className="MarginVertical">Indique la cota de error:</span>
          <Input name="errorDimension" value={errorDimension} /> 
        </div>

        <div className="ButtonsContainer">
          <div className="Button" onClick={resolveMatrix}>
            <p>Resolver</p>
          </div>
        </div>
      </div>
    }

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
