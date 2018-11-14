import React from 'react';
import Input from '../components/Input';
import Matrix from '../components/Matrix';
import RefreshIcon from '../img/refresh.svg';

const Initilization = ({ n, m, a, b, x, onChange, onBuildMatrix }) => (
  <div className="Step">
    <h1>Bienvenido a SIEL</h1>
    <span className="MarginVertical">Ingrese las dimensiones de las matrices del sistema a resolver:</span>
    <div className="DimentionsContainer">
      <Input name="n" title="n = " value={n} onChange={onChange} />
      <Input name="m" title="m = " value={m} onChange={onChange} />
      <div className="ButtonContainer" onClick={onBuildMatrix}>
        <img src={RefreshIcon} alt="Refresh" />
        <p>Construir matrices</p>
      </div>
    </div>
    <div className="SimpleLine" />
    <span className="MarginVertical">Ingrese los coeficientes de las matrices:</span>
    <div className="MatrixesContainer">
      <Matrix name="a" values={a} onChange={onChange} />
      <p>·</p>
      <Matrix values={x} editable={false} type="text" />
      <p>=</p>
      <Matrix name="b" values={b} onChange={onChange} />
    </div>
    <div className="SimpleLine" />
  </div>
);

export default Initilization;
