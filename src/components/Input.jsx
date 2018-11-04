import React from 'react';

const Input = ({ name, title, value, onChange }) => (
  <label>
    {title && <p>{title}</p>}
    <input name={name} value={value} onChange={onChange} type="number" />
  </label>
);

export default Input;
