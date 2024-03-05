import React from 'react';
import { IoIosAdd } from 'react-icons/io';

const ButtonAdd = (props) => {
  const { title, onClick, className } = props;
  return (
    <button
      className="text-sm font-medium text-white bg-second-blue pl-2 pr-12 py-2 rounded-md"
      onClick={onClick}
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
