import React from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const ButtonDetailKelas = (props) => {
  const { isOpenPopUpDetail, setIsOpenPopUpDetail } = props;
  return (
    <Link
      className="w-fit h-fit text-2xl text-black bg-white px-1.5 py-1 flex justify-center items-center rounded-md cursor-pointer"
      to={'/DetailKelas'}
      onClick={() => {
        setIsOpenPopUpDetail(!isOpenPopUpDetail);
      }}
    >
      <IoEyeSharp />
    </Link>
  );
};
export default ButtonDetailKelas;
