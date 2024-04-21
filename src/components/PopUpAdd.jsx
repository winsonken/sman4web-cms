import React from 'react';
import Icon from './Icon';
import { IoClose } from 'react-icons/io5';

const PopUpAdd = (props) => {
  const {
    isOpenPopUpAdd,
    setIsOpenPopUpAdd,
    title,
    icon,
    children,
    className,
  } = props;

  return (
    <div>
      {isOpenPopUpAdd && (
        <div
          className="bg-modal-bg z-20 fixed top-0 left-0 right-0 bottom-0"
          onClick={() => {
            setIsOpenPopUpAdd(false);
          }}
        >
          <div className="w-screen h-screen flex justify-center items-center z-50">
            <div
              className={`bg-white w-4/5 h-fit max-h-[80%] p-3 rounded-md duration-200 z-10 ${className}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="w-full flex flex-col gap-3 overflow-x-clip">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Icon icons={icon} type="add" />
                    <h1 className="text-base font-semibold">
                      {title || 'Tambah data'}
                    </h1>
                  </div>

                  <IoClose
                    className="text-2xl cursor-pointer"
                    onClick={() => {
                      setIsOpenPopUpAdd(false);
                    }}
                  />
                </div>

                <div>{children}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpAdd;
