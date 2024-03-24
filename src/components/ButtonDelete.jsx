import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

const ButtonDelete = (props) => {
  const { data, isOpenPopUpDelete, setIsOpenPopUpDelete, setGetData } = props;
  return (
    <div
      className="w-fit h-fit text-2xl text-red-600 bg-white px-1.5 py-1 flex justify-center items-center rounded-md cursor-pointer"
      onClick={() => {
        setIsOpenPopUpDelete(!isOpenPopUpDelete);
        setGetData(data);
      }}
    >
      <MdDeleteForever />
    </div>
  );
};

export default ButtonDelete;
