import React from 'react';
import Input from '../components/Input';
import Matrix from '../components/Matrix';
import RefreshIcon from '../img/refresh.svg';

const Initilization = ({ n, m, a, b, x, onChange, onBuildMatrix, analyzeMatrix, matrix_analysis}) => (
  <div className="Step">
    <h1>Bienvenido a SIEL</h1>
    <h3>Ingrese las dimensiones de las matrices del sistema a resolver:</h3>
    <div className="DimentionsContainer">
      <Input name="n" title="n = " value={n} onChange={onChange} />
      <Input name="m" title="m = " value={m} onChange={onChange} />
      <div className="ButtonContainer" onClick={onBuildMatrix}>
        <img src={RefreshIcon} alt="Refresh" />
        <p>Construir matrices</p>
      </div>
    </div>
    <div className="SimpleLine" />
    <h3>Ingrese los coeficientes de las matrices:</h3>
    <div className="MatrixesContainer">
      <Matrix name="a" values={a} onChange={onChange} />
      <p>·</p>
      <Matrix values={x} editable={false} type="text" />
      <p>=</p>
      <Matrix name="b" values={b} onChange={onChange} />
   
      <div className="ButtonContainer" onClick={analyzeMatrix}>
        <p>Analizar</p>
      </div>
    </div>

    {matrix_analysis == 'nothing' ? <h4> La matriz no es diagonalmente dominante. Reorganice filas o columnas para lograr esta condicion </h4> : null}
    {matrix_analysis == 'dominant' ?  <h4> La matriz es dominante diagonalmente. </h4> : null}
    {matrix_analysis == 'strict' ?  <h4> La matriz es estrictamente dominante diagonalmente . </h4> : null}

    <div className="SimpleLine" />
  </div>
);

export default Initilization;
