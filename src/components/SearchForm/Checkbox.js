import React from 'react';

const Checkbox = ({isSelected, label, onCheckboxChange}) => (
  <React.Fragment>
    <input 
      type="checkbox"
      name={label}
      id={label}
      checked={isSelected}
      onChange={onCheckboxChange}
    />
    <label htmlFor={label}>{label}</label>
  </React.Fragment>
)

export default Checkbox