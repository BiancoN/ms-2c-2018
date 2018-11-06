import React from 'react';

const Input = (
  { name, title, value, type = "number", editable = true, onChange }
) => (
  <label className="Input">
    {title && <p>{title}</p>}
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      disabled={!editable}
    />
  </label>
);

export default Input;
