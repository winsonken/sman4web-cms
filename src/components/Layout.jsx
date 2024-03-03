import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const sideValue = localStorage.getItem('side-open');
  const [openSidebar, setOpenSidebar] = useState(sideValue === 'true');

  useEffect(() => {
    localStorage.setItem('side-open', openSidebar);
  }, [openSidebar]);

  return (
    <div className="flex flex-row">
      <Sidebar openSidebar={openSidebar} />

      <div className="flex flex-col w-full">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        <div className="h-full bg-main-gray">content</div>
      </div>
    </div>
  );
};

export default Layout;
