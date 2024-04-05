import React from 'react';

const ButtonCustom = (props) => {
  const { title, data, isOpenPopUp, setIsOpenPopUp, setGetData } = props;
  return (
    <button
      className="bg-[#416D19] text-base text-white px-5 py-1.5 rounded-md"
      onClick={() => {
        setIsOpenPopUp(!isOpenPopUp);
        setGetData(data);
      }}
    >
      {title || 'Button'}
    </button>
  );
};

export default ButtonCustom;
