import React from 'react';
import { FaEdit } from 'react-icons/fa';

const ButtonEdit = (props) => {
  const { isOpenPopUpEdit, setIsOpenPopUpEdit } = props;
  return (
    <div
      className="w-fit h-fit text-2xl text-yellow-500 bg-white p-1.5 flex justify-center items-center rounded-md cursor-pointer"
      onClick={() => {
        setIsOpenPopUpEdit(!isOpenPopUpEdit);
      }}
    >
      <FaEdit />
    </div>
  );
};

export default ButtonEdit;
