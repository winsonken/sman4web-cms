import React from 'react';
import logo from '../assets/logo-sman4.png';
import icon from '../assets/icon-sman4.png';
import { Link, NavLink } from 'react-router-dom';
import { BiSolidDashboard } from 'react-icons/bi';
import { BiSolidUser } from 'react-icons/bi';
import { MdStairs } from 'react-icons/md';
import { FaCalendar } from 'react-icons/fa';
import { RiDoorOpenFill } from 'react-icons/ri';
import { PiUsersThreeFill } from 'react-icons/pi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa';
import { FaMedal } from 'react-icons/fa6';
import { PiBookBookmarkFill } from 'react-icons/pi';
import { MdDoNotDisturb } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa6';
import { MdLogout } from 'react-icons/md';

const Sidebar = (props) => {
  const { openSidebar } = props;
  const pages = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: <BiSolidDashboard />,
    },
    {
      name: 'Profile',
      link: '/',
      icon: <BiSolidUser />,
    },
    {
      name: 'Angkatan',
      link: 'link',
      icon: <MdStairs />,
    },
    {
      name: 'Tahun ajaran',
      link: 'link',
      icon: <FaCalendar />,
    },
    {
      name: 'Kelas',
      link: 'link',
      icon: <RiDoorOpenFill />,
    },
    {
      name: 'Siswa',
      link: 'link',
      icon: <PiUsersThreeFill />,
    },
    {
      name: 'Guru',
      link: 'link',
      icon: <FaChalkboardTeacher />,
    },
    {
      name: 'Alumni',
      link: 'link',
      icon: <FaUserGraduate />,
    },
    {
      name: 'Jurusan',
      link: 'link',
      icon: <FaBookOpen />,
    },
    {
      name: 'Prestasi',
      link: 'link',
      icon: <FaMedal />,
    },
    {
      name: 'Rapot siswa',
      link: 'link',
      icon: <PiBookBookmarkFill />,
    },
    {
      name: 'Pelanggaran',
      link: 'link',
      icon: <MdDoNotDisturb />,
    },
    {
      name: 'PPDB',
      link: 'link',
      icon: <FaUserPlus />,
    },
  ];
  return (
    <nav
      className={`h-screen bg-main-blue px-3 relative overflow-x-hidden overflow-y-auto duration-300 ${
        openSidebar
          ? 'w-[300px] xs:w-[270px] min-w-[200px]'
          : 'w-[50px] md:w-[70px] min-w-[50px]'
      }`}
    >
      <div className="w-full h-full">
        <Link to="/">
          <div className="bg-main-blue pt-3 flex justify-center items-center sticky top-0">
            <img
              src={openSidebar ? logo : icon}
              alt="SMAN4 Logo"
              className={`${openSidebar ? 'w-32 min-w-16' : 'min-w-4'}`}
            />
          </div>
        </Link>

        <div
          className={`mt-3 px-2 flex flex-col justify-center ${
            openSidebar ? 'items-start' : 'items-center'
          }`}
        >
          {openSidebar
            ? pages.map((pagesList) => (
                <NavLink to={pagesList.link} className="nav-link">
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-2xl text-main-cream">
                      {pagesList.icon}
                    </span>
                    <span className="text-md font-medium text-main-cream md:text-lg">
                      {pagesList.name}
                    </span>
                  </div>
                </NavLink>
              ))
            : pages.map((pagesList) => (
                <NavLink to={pagesList.link} className="nav-link">
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-2xl text-main-cream">
                      {pagesList.icon}
                    </span>
                  </div>
                </NavLink>
              ))}

          <div>
            <button>
              <div className="flex">
                {openSidebar ? (
                  <div className="nav-link flex justify-center items-center gap-2 mt-3">
                    <span className="text-2xl text-main-cream">
                      <MdLogout />
                    </span>

                    <span className="nav-link text-md font-medium text-main-cream md:text-lg">
                      Logout
                    </span>
                  </div>
                ) : (
                  <div className="nav-link flex gap-2 mt-3">
                    <span className="text-2xl text-main-cream">
                      <MdLogout />
                    </span>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
