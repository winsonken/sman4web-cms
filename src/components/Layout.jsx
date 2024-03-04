import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = (props) => {
  const { children } = props;
  const sideValue = localStorage.getItem('side-open');
  const [openSidebar, setOpenSidebar] = useState(sideValue === 'true');
  const [deviceWidth] = useState(window.innerWidth);

  const handleResize = () => {
    if (deviceWidth <= 800) {
      setOpenSidebar(false);
    } else {
      setOpenSidebar(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('side-open', openSidebar);
  }, [openSidebar]);

  return (
    <div className="flex flex-row">
      <Sidebar openSidebar={openSidebar} />

      <div className="flex flex-col w-full">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        <div className="h-full bg-main-gray p-3 rounded-md">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
