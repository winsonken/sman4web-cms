import React from 'react';

const ButtonAction = (props) => {
  const { title, isOpenPopUp, setIsOpenPopUp } = props;
  return (
    <button
      className="bg-[#598392] text-base text-white px-5 py-0.5 rounded-md"
      onClick={() => {
        setIsOpenPopUp(!isOpenPopUp);
      }}
    >
      {title || 'Button'}
    </button>
  );
};

export default ButtonAction;
