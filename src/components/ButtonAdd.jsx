import React from 'react';
import { IoIosAdd } from 'react-icons/io';

const ButtonAdd = (props) => {
  const { title, className, isOpenPopUpAdd, setIsOpenPopUpAdd } = props;
  return (
    <button
      className="h-fit text-sm font-medium text-white bg-second-blue px-3 py-2 rounded-md"
      onClick={() => {
        setIsOpenPopUpAdd(!isOpenPopUpAdd);
      }}
    >
      <div className="flex justify-start items-center gap-2">
        <span className="text-xl">
          <IoIosAdd />
        </span>
        <span>{title || 'Tambah data'}</span>
      </div>
    </button>
  );
};

export default ButtonAdd;
