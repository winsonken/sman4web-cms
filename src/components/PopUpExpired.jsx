import React from 'react';
import { IoIosWarning } from 'react-icons/io';
import Button from './Button';

const PopUpExpired = (props) => {
  const { onClick } = props;
  return (
    <div>
      <div className="bg-modal-bg z-20 fixed top-0 left-0 right-0 bottom-0">
        <div className="w-screen h-screen flex justify-center items-center z-50">
          <div
            className={`bg-white w-4/5 max-h-[80%] p-3 rounded-md duration-200 max-w-xl`}
          >
            <div className="w-full flex flex-col gap-3 overflow-x-clip">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <IoIosWarning className="text-red-500 text-3xl" />
                    <h1 className="text-base font-semibold">Session Expired</h1>
                  </div>
                  <p>Sesi anda telah berakhir silahkan ulang login</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button title="OK" onClick={onClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpExpired;
