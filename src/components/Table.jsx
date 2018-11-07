import React from 'react';
import _ from 'lodash';
import Input from './Input';

const Table = ({ values, x }) => {
  const namesRow = ['i'].concat(_.flatten(x));
  const indexedRows = values.map((row, index) => [index].concat(row));
  const table = [namesRow].concat(indexedRows);
  return (
    <div className="Table">
    {
      table.map((row, index) =>
        <div className={`RowContainer ${index === table.length - 1 ? 'LastRow' : ''}`}>
        {
          row.map(coef => <Input value={coef} editable={false} type="text" />)
        }
        </div>
      )
    }
    </div>
  );
};

export default Table;
