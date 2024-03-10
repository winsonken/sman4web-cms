import React from 'react';

const ButtonAction = (props) => {
  const { title, isOpenPopUp, setIsOpenPopUp } = props;
  return (
    <button
      className="bg-blue-100 text-base font-medium px-5 py-1.5 rounded-md"
      onClick={() => {
        setIsOpenPopUp(!isOpenPopUp);
      }}
    >
      {title || 'Button'}
    </button>
  );
};

export default ButtonAction;
