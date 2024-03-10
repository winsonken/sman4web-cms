import React from 'react';
import { HiPlus } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

const Icon = (props) => {
  const { icons, type } = props;

  return (
    <div className="relative w-fit h-fit">
      <div className="text-3xl">{icons}</div>
      <div className="absolute right-0 bottom-0">
        {type && type == 'add' ? (
          <div className="rounded-full bg-white p-0.5">
            <HiPlus className="text-[0.6rem]" />
          </div>
        ) : type == 'edit' ? (
          <div className="rounded-full bg-white p-0.5">
            <MdEdit className="text-[0.6rem]" />
          </div>
        ) : type == 'delete' ? (
          <div className="rounded-full bg-white p-0.5">
            <MdDelete className="text-[0.6rem]" />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Icon;
