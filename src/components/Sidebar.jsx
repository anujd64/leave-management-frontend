import React, { useContext, useEffect, useState } from "react";
import { FaHome, FaCalendar, FaCog, FaCalendarCheck } from "react-icons/fa";
import { IoPersonSharp, IoArrowBack, IoArrowForward } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import HelperToolTip from "./HelperToolTip";
function Sidebar() {
  const isManager = useContext(GlobalContext).isManager;
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
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
      link: "/leave",
      icon: <FaCalendar />,
    },
    {
      title: "Settings",
      link: "/settings",
      icon: <FaCog />,
    },
  ];

  if (isManager[0] === "true") {
    SidebarData.push({
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
        <ul className="px-4 py-2 flex flex-col w-full place-content-center text-white">
          {SidebarData.map((val, key) => (
            <li
              key={key}
              className={`h-12 group relative w-full flex flex-row items-center justify-center ${activeTab === val.link ? "bg-gray-500 rounded-xl" : ""}`}
              onClick={() => handleSidebarClick(val.link)}
            >
              <NavLink
                to={val.link}
                id="icon"
                className="flex basis-1/3 justify-center items-center"
              >
                {val.icon}
              </NavLink>
              {sidebarVisible && <NavLink
                to={val.link}
                id="title"
                className="flex basis-2/3 text-nowrap"
              >
                {val.title}
              </NavLink>}
              {/* <HelperToolTip className="left-14 top-1" text={val.title} /> */}
            </li>
          ))}
        </ul>
      <button onClick={toggleSidebar} className="flex justify-center items-center w-full text-white">
        {sidebarVisible ? <span className="w-full flex flex-row gap-6 text-nowrap items-center justify-center"> <IoArrowBack /> Collapse Sidebar </span> : <IoArrowForward />}
      </button>
      </div>
    </div>
  );
}

export default Sidebar;
