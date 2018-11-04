import React from 'react';
import Input from '../components/Input';
import Matrix from '../components/Matrix';

const Initilization = ({ n, m, a, b, onChange }) => (
  <div>
    <h1>Bienvenido a SIEL</h1>
    <h3>Ingrese las dimensiones de las matrices:</h3>
    <Input name="n" title="n = " value={n} onChange={onChange} />
    <Input name="m" title="m = " value={m} onChange={onChange} />
    <Matrix name="a" values={a} onChange={onChange} />
    <Matrix name="b" values={b} onChange={onChange} />
  </div>
);

export default Initilization;
