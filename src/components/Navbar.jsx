import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../services/features/authSlice';

const Navbar = (props) => {
  const { openSidebar, setOpenSidebar } = props;
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const { nama } = user;

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div
      className={`w-full flex justify-between items-center p-3 bg-main-blue relative ${
        openSidebar ? 'w-[calc(100%-300px)' : 'w-[calc(100%-50px)]'
      }`}
    >
      <div
        className="text-xl text-second-blue cursor-pointer"
        onClick={() => {
          setOpenSidebar(!openSidebar);
        }}
      >
        <RxHamburgerMenu />
      </div>
      <div
        className="text-main-cream pr-3 flex items-center gap-1 cursor-pointer md:pr-5 md:gap-2 hover:text-second-blue duration-300"
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      >
        <div className="text-xl md:text-2xl">
          <FaUserCircle />
        </div>

        <p className="text-sm font-medium hidden md:text-lg md:block">{nama}</p>
      </div>

      {openMenu && (
        <div className="w-[150px] bg-main-blue p-2 absolute top-16 right-2 rounded-md md:p-3 md:right-5 md:w-[250px]">
          <p className="text-xs font-medium text-main-cream md:hidden">
            {nama}
          </p>

          <div className="flex flex-col gap-2 mt-2 md:mt-0">
            <Link to="/profile">
              <div className="flex items-center gap-1 text-base font-medium text-second-blue md:text-xl hover:text-main-cream duration-200">
                <span>
                  <FaUserCircle />
                </span>
                <span>Profile</span>
              </div>
            </Link>

            <div
              className="flex items-center gap-1 text-base font-medium text-second-blue md:text-xl hover:text-main-cream duration-200 cursor-pointer"
              onClick={handleLogout}
            >
              <span>
                <MdLogout />
              </span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
