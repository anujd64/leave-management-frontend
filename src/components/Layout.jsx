import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

const Layout = ({ children }) => {
  const token = useContext(GlobalContext).token;
      
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900">
      <Navbar/>
      <div className="flex flex-row w-full">
        {token && <Sidebar />}
        {children}
      </div>
    </div>
  );
};

export default Layout;