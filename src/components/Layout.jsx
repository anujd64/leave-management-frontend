import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

const Layout = ({ children }) => {
  const token = useContext(GlobalContext).token;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex flex-1">
        {token && <Sidebar />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
