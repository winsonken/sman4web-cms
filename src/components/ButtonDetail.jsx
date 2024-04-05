import React from 'react';
import { IoEyeSharp } from 'react-icons/io5';

const ButtonDetail = (props) => {
  const { data, isOpenPopUpDetail, setIsOpenPopUpDetail, setGetData } = props;
  return (
    <div
      className="w-fit h-fit text-2xl text-black bg-white px-1.5 py-1 flex justify-center items-center rounded-md cursor-pointer"
      onClick={() => {
        setIsOpenPopUpDetail(!isOpenPopUpDetail);
        setGetData && setGetData(data);
      }}
    >
      <IoEyeSharp />
    </div>
  );
};

export default ButtonDetail;
