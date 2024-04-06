import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const token = localStorage.getItem("token");    
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 h-screen">
      <Navbar/>
      <div className="flex flex-row w-full h-screen mt-16">
        {token && <Sidebar />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
