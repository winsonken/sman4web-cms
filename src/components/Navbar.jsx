import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaUserCircle } from 'react-icons/fa';
const Navbar = (props) => {
  const { openSidebar, setOpenSidebar } = props;
  return (
    <div className="w-full flex justify-between items-center p-3 bg-main-blue">
      <div
        className="text-xl text-second-blue cursor-pointer"
        onClick={() => {
          setOpenSidebar(!openSidebar);
        }}
      >
        <RxHamburgerMenu />
      </div>
      <FaUserCircle />
    </div>
  );
};

export default Navbar;
