import React, { useContext, useEffect, useState } from "react";
import { FaHome, FaCalendar, FaCog, FaCalendarCheck, FaCalendarPlus } from "react-icons/fa";
import { IoPersonSharp, IoArrowBack, IoArrowForward } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import HelperToolTip from "./HelperToolTip";
function Sidebar() {
  const userData = JSON.parse(localStorage.getItem("profileData"));
  const location = useLocation();
  const activeTab = useContext(GlobalContext).activeTab;
  const setActiveTab = useContext(GlobalContext).setActiveTab;
  const sidebarVisible = useContext(GlobalContext).sidebarVisible;
  const setSidebarVisible = useContext(GlobalContext).setSidebarVisible;

  const SidebarData = [
    {
      title: "Dashboard",
      link: "/",
      icon: <FaHome />,
    },
    {
      title: "Profile",
      link: "/profile",
      icon: <IoPersonSharp />,
    },
    {
      title: "Apply for Leave",
      link: "/apply-leave",
      icon: <FaCalendarPlus />,
    },
    {
      title: "Leave History",
      link: "/leave-history",
      icon: <FaCalendar />,
    },
  ];

  if (userData.isManager === true) {
    SidebarData.push( {
      title: "Manage Leaves",
      link: "/manage-leaves",
      icon: <FaCalendarCheck />,
    });
  }

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleSidebarClick = (link) => {
    setActiveTab(link);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`home-container`}>
      
      <div className={`bg-[#2F4050] h-full sidebar transition-all duration-500 ${sidebarVisible ? "w-[250px]" : "w-20"}`}>
        <div className="px-4 py-2 flex flex-col w-full place-content-center text-white">
          {SidebarData.map((val, key) => (
            <NavLink
              to={val.link}
              key={key}
              className={`h-12 group relative w-full flex flex-row items-center justify-center rounded-xl cursor-pointer ${activeTab === val.link ? "bg-gray-500" : "bg-[#2F4050]"}`}
              onClick={() => handleSidebarClick(val.link)}
            >
              <div
                id="icon"
                className="flex basis-1/3 justify-center items-center"
              >
                {val.icon}
              </div>
              {sidebarVisible && <div
                id="title"
                className={`flex basis-2/3 text-nowrap transition-all ease-in-out ${sidebarVisible ? "flex" : "hidden"}`}
              >
                {val.title}
              </div>}
              {/* <HelperToolTip className="left-16 -top-3 z-50 hidden" text={val.title} /> */}
            </NavLink>
          ))}
        </div>
      <button onClick={toggleSidebar} className="flex justify-center items-center w-full text-white">
        {sidebarVisible ? <span className="w-full flex flex-row gap-6 text-nowrap items-center justify-center"> <IoArrowBack /> Collapse Sidebar </span> : <IoArrowForward />}
      </button>
      </div>
    </div>
  );
}

export default Sidebar;
