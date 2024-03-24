import React from 'react';
import { FaEdit } from 'react-icons/fa';

const ButtonEdit = (props) => {
  const { data, isOpenPopUpEdit, setIsOpenPopUpEdit, setGetData } = props;
  return (
    <div
      className="w-fit h-fit text-2xl text-yellow-500 bg-white px-1.5 py-1 flex justify-center items-center rounded-md cursor-pointer"
      onClick={() => {
        setIsOpenPopUpEdit(!isOpenPopUpEdit);
        setGetData(data);
      }}
    >
      <FaEdit />
    </div>
  );
};

export default ButtonEdit;
