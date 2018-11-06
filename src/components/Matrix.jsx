import React from 'react';
import Input from './Input';

const Matrix = ({ name, values, type, editable,  onChange }) => (
  <div className="MatrixContainer">
  {
    values.map((row, n) =>
      <div className="RowContainer">
      {
        row.map((coef, m) =>
          <Input
            name={`${name}.${n}.${m}`}
            value={coef}
            onChange={onChange}
            editable={editable}
            type={type}
          />
        )
      }
      </div>
    )
  }
  </div>
);

export default Matrix;
