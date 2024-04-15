import React, { useState } from 'react';

const InputCheckbox = ({ checked: initialChecked, onChange, disabled }) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    onChange && onChange(e.target.checked);
  };

  return (
    <input
      type="checkbox"
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default InputCheckbox;
