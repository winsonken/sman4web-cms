import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = (props) => {
  const { children } = props;
  const sideValue = localStorage.getItem('side-open');
  const [openSidebar, setOpenSidebar] = useState(sideValue === 'true');

  const handleResize = () => {
    if (window.innerWidth <= 800) {
      setOpenSidebar(false);
    } else {
      setOpenSidebar(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('side-open', openSidebar.toString());
  }, [openSidebar]);

  return (
    <div className="flex flex-row">
      <Sidebar openSidebar={openSidebar} />

      <div className="flex flex-col w-full">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        <div className="w-full h-full bg-main-gray p-3 flex justify-center overflow-auto">
          <div className="w-full max-h-[90vh] bg-white p-5 rounded-lg overflow-x-hidden overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
