import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

const ButtonDelete = (props) => {
  const { isOpenPopUpDelete, setIsOpenPopUpDelete } = props;
  return (
    <div
      className="w-fit h-fit text-3xl cursor-pointer flex justify-center items-center"
      onClick={() => {
        setIsOpenPopUpDelete(!isOpenPopUpDelete);
      }}
    >
      <MdDeleteForever />
    </div>
  );
};

export default ButtonDelete;
