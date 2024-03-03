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
    {
      name: 'Logout',
      link: 'link',
      icon: <MdLogout />,
    },
  ];
  return (
    <nav
      className={`h-screen bg-main-blue p-3 relative overflow-x-hidden overflow-y-auto duration-200 ${
        openSidebar ? 'w-[310px] sm:w-[250px] md:w-[200px]' : 'w-[80px]'
      }`}
    >
      <div className="bg-main-blue flex justify-center items-center sticky top-0 left-0">
        <Link to="/" className="w-full flex justify-center items-center">
          <img
            src={openSidebar ? logo : icon}
            alt="Logo SMAN4"
            className={` ${openSidebar ? 'w-16 sm:w-28' : 'w-16'}`}
          />
        </Link>
      </div>

      <div className="mt-5">
        {openSidebar
          ? pages.map((pagesList) => (
              <NavLink to={pagesList.link}>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl text-main-cream">
                    {pagesList.icon}
                  </span>
                  <span className="font-medium text-main-cream">
                    {pagesList.name}
                  </span>
                </div>
              </NavLink>
            ))
          : pages.map((pagesList) => (
              <NavLink to={pagesList.link}>
                <div className="flex justify-center mt-2">
                  <p className="text-3xl text-main-cream">{pagesList.icon}</p>
                </div>
              </NavLink>
            ))}
      </div>
    </nav>
  );
};

export default Sidebar;
