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

      <div
        className={`flex flex-col flex-1 duration-200 ${
          openSidebar
            ? 'w-[calc(100%-160px)] xs:w-[calc(100%-200px)] sm:w-[calc(100%-270px)]'
            : 'w-[calc(100%-50px)] md:w-[calc(100%-70px)]'
        }`}
      >
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        <div className={`h-full bg-main-gray p-3 flex justify-center `}>
          <div className="w-full max-h-[90vh] bg-white p-5 rounded-lg overflow-x-clip overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
