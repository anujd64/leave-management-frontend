import React, { useState } from 'react';
import './Sidebar.css';
import { FaHome, FaCalendar, FaCog } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const [activeTab, setActiveTab] = useState('/');

  const SidebarData = [
    {
      title: 'Dashboard',
      link: '/',
      icon: <FaHome/>
    },
    {
      title: 'Profile',
      link: '/profile',
      icon: <IoPersonSharp/>
    },
    {
      title: 'Apply for Leave',
      link: '/leave',
      icon: <FaCalendar/>
    },
    {
      title: 'Settings',
      link: '/settings',
      icon: <FaCog/>
    }
  ];
  

  const handleSidebarClick = (link) => {
    setActiveTab(link);
  };

  return (
    <div className="home-container">
      <div className="Sidebar">
        <ul className='SidebarList'>
          {SidebarData.map((val, key) => {
            return (
              <li key={key}
              className={activeTab === val.link ? "row active" : "row"}
              onClick={() => handleSidebarClick(val.link)}>
              <NavLink to={val.link} id='icon'>{val.icon}</NavLink>
              <NavLink to={val.link} id='title'>{val.title}</NavLink>
            </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;