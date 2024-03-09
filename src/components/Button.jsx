import React from 'react';

const Button = (props) => {
  const { type, title, setIsOpenPopUp } = props;
  return (
    <button
      type={type == 'submit' ? 'submit' : ''}
      onClick={() => {
        setIsOpenPopUp && setIsOpenPopUp(false);
      }}
      className={`text-md font-medium flex justify-center text-main-cream px-3 py-2 rounded-md overflow-x-clip md:px-5 ${
        type == 'submit'
          ? 'bg-second-blue'
          : type == 'cancel'
          ? 'bg-main-red'
          : 'bg-second-blue'
      }`}
    >
      {title || ''}
    </button>
  );
};

export default Button;
