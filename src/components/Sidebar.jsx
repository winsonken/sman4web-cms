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
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentModules } from '../services/features/authSlice';
import { FiActivity } from 'react-icons/fi';
import { GiGraduateCap } from 'react-icons/gi';
import { SiGoogleclassroom } from 'react-icons/si';
import { GrUserAdmin } from 'react-icons/gr';
import { FaUserClock } from 'react-icons/fa';

const Sidebar = (props) => {
  const { openSidebar } = props;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const modules = useSelector(selectCurrentModules);

  const filterModule = (kodeModul) => {
    const module = modules?.find(
      (allModules) => allModules?.kode_modul == kodeModul
    );
    return module;
  };
  const modulesDashboard = filterModule('dashboard');
  const modulesProfile = filterModule('profile');
  const modulesAngkatan = filterModule('data_angkatan');
  const modulesTahunAjaran = filterModule('data_tahun_ajaran');
  const moduleKelas = filterModule('data_kelas');
  const modulesSiswa = filterModule('data_siswa');
  const modulesGuru = filterModule('data_guru');
  const modulesTendik = filterModule('data_tendik');
  const modulesAlumni = filterModule('data_alumni');
  const modulesKelulusan = filterModule('data_kelulusan');
  const modulesKelasSiswa = filterModule('data_kelas_siswa');
  const modulesJurusan = filterModule('data_jurusan');
  const modulesAktivitas = filterModule('data_aktivitas');
  const modulesPrestasi = filterModule('data_prestasi');
  const modulesRapot = filterModule('data_rapot');
  const modulesPelanggaran = filterModule('data_pelanggaran');
  const modulesPpdb = filterModule('data_ppdb');
  const modulesRole = filterModule('data_role');

  const pages = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: <BiSolidDashboard />,
      access: modulesDashboard?.akses,
    },
    {
      name: 'Profile',
      link: '/profile',
      icon: <BiSolidUser />,
      access: modulesProfile?.akses,
    },
    {
      name: 'Angkatan',
      link: '/angkatan',
      icon: <MdStairs />,
      access: modulesAngkatan?.akses,
    },
    {
      name: 'Tahun ajaran',
      link: '/tahun-ajaran',
      icon: <FaCalendar />,
      access: modulesTahunAjaran?.akses,
    },
    {
      name: 'Kelas',
      link: '/kelas',
      icon: <RiDoorOpenFill />,
      access: moduleKelas?.akses,
    },
    {
      name: 'Siswa',
      link: '/siswa',
      icon: <PiUsersThreeFill />,
      access: modulesSiswa?.akses,
    },
    {
      name: 'Guru',
      link: '/guru',
      icon: <FaChalkboardTeacher />,
      access: modulesGuru?.akses,
    },
    {
      name: 'Tendik',
      link: '/tendik',
      icon: <GrUserAdmin />,
      access: modulesTendik?.akses,
    },
    {
      name: 'Alumni',
      link: '/alumni',
      icon: <FaUserGraduate />,
      access: modulesAlumni?.akses,
    },
    {
      name: 'Jurusan',
      link: '/jurusan',
      icon: <FaBookOpen />,
      access: modulesJurusan?.akses,
    },
    {
      name: 'Aktivitas',
      link: '/aktivitas',
      icon: <FiActivity />,
      access: modulesAktivitas?.akses,
    },
    {
      name: 'PPDB',
      link: '/ppdb',
      icon: <FaUserClock />,
      access: modulesPpdb?.akses,
    },
    {
      name: 'Kelas siswa',
      link: '/kelas-siswa',
      icon: <SiGoogleclassroom />,
      access: modulesKelasSiswa?.akses,
    },
    {
      name: 'Prestasi',
      link: '/prestasi',
      icon: <FaMedal />,
      access: modulesPrestasi?.akses,
    },
    {
      name: 'Rapot siswa',
      link: '/rapot',
      icon: <PiBookBookmarkFill />,
      access: modulesRapot?.akses,
    },
    {
      name: 'Pelanggaran',
      link: '/pelanggaran',
      icon: <MdDoNotDisturb />,
      access: modulesPelanggaran?.akses,
    },
    {
      name: 'Kelulusan',
      link: '/kelulusan',
      icon: <GiGraduateCap />,
      access: modulesKelulusan?.akses,
    },
    {
      name: 'Role',
      link: '/role',
      icon: <FaUserPlus />,
      access: modulesRole?.akses,
    },
  ];
  return (
    <nav
      className={`h-screen bg-main-blue px-1 relative overflow-x-hidden overflow-y-auto duration-300 md:px-3 ${
        openSidebar
          ? 'w-[160px] xs:w-[200px] sm:w-[250px] md:w-[230px]'
          : 'w-[50px] md:w-[70px]'
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
                <NavLink
                  to={pagesList?.link}
                  className={`nav-link ${
                    pagesList?.access ? 'block' : 'hidden'
                  }`}
                  key={pagesList?.name}
                >
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-2xl text-main-cream">
                      {pagesList?.icon}
                    </span>
                    <span className="text-md font-medium text-main-cream md:text-lg">
                      {pagesList?.name}
                    </span>
                  </div>
                </NavLink>
              ))
            : pages.map((pagesList) => (
                <NavLink
                  to={pagesList?.link}
                  className={`nav-link ${
                    pagesList?.access ? 'block' : 'hidden'
                  }`}
                  key={pagesList?.name}
                >
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-2xl text-main-cream">
                      {pagesList?.icon}
                    </span>
                  </div>
                </NavLink>
              ))}

          <div>
            <button onClick={handleLogout}>
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
