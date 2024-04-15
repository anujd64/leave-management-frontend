import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper({ children }) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [employeeId, setEmployeeId] = useState(localStorage.getItem('employeeId'));
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const isManager = useState(localStorage.getItem('isManager'));
    const departmentId = useState(localStorage.getItem('departmentId'));
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [activeTab, setActiveTab] = useState(location.pathname);

    return <GlobalContext.Provider value={{monthIndex, setMonthIndex, token, setToken, employeeId, setEmployeeId, username, setUsername, isManager, departmentId, sidebarVisible, setSidebarVisible, activeTab, setActiveTab}}>
        {children}
        </GlobalContext.Provider>;
}