import React from 'react';
import Input from './Input';

const Matrix = ({ name, values, onChange }) => (
  values.map((row, n) =>
    row.map((coef, m) =>
      <Input name={`${name}.${n}.${m}`} value={coef} onChange={onChange} />
    )
  )
);

export default Matrix;
