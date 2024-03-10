import React from 'react';
import { IoEyeSharp } from 'react-icons/io5';

const ButtonDetail = (props) => {
  const { isOpenPopUpDetail, setIsOpenPopUpDetail } = props;
  return (
    <div
      className="w-fit h-fit text-2xl text-black bg-white p-1.5 flex justify-center items-center rounded-md cursor-pointer"
      onClick={() => {
        setIsOpenPopUpDetail(!isOpenPopUpDetail);
      }}
    >
      <IoEyeSharp />
    </div>
  );
};

export default ButtonDetail;
