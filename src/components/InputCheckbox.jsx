// import React, { useState } from 'react';

// const InputCheckbox = (props) => {
//   const { checked, name, onChange } = props;

//   return (
//     <input
//       type="checkbox"
//       id={name}
//       name={name}
//       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
//       checked={checked}
//       onChange={onChange}
//     />
//   );
// };

// export default InputCheckbox;

import React, { useState } from 'react';

const InputCheckbox = ({ checked: initialChecked, onChange }) => {
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
    />
  );
};

export default InputCheckbox;
