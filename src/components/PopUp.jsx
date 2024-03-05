import React from 'react';

const PopUp = (props) => {
  const { isOpenPopUp, setIsOpenPopUp } = props;

  return (
    <div>
      {isOpenPopUp && (
        <div
          className="bg-modal-bg z-20 fixed top-0 left-0 right-0 bottom-0"
          onClick={() => {
            console.log('lol');
          }}
        >
          <div
            className="w-screen h-screen flex justify-center items-center z-50"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="bg-white w-4/5 h-52">popup</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp;
