import React from 'react';
import Input from '../components/Input';
import Matrix from '../components/Matrix';
import RefreshIcon from '../img/refresh.svg';

const Initilization = ({ n, m, a, b, onChange, onBuildMatrix }) => (
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
    <Matrix name="a" values={a} onChange={onChange} />
    <Matrix name="b" values={b} onChange={onChange} />
  </div>
);

export default Initilization;
