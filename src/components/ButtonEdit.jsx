import React from 'react';
import { FaEdit } from 'react-icons/fa';

const ButtonEdit = (props) => {
  const { isOpenPopUpEdit, setIsOpenPopUpEdit } = props;
  return (
    <div
      className="w-fit h-fit text-3xl cursor-pointer flex justify-center items-center"
      onClick={() => {
        setIsOpenPopUpEdit(!isOpenPopUpEdit);
      }}
    >
      <FaEdit />
    </div>
  );
};

export default ButtonEdit;
