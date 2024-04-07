import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper({ children }) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [employeeId, setEmployeeId] = useState(localStorage.getItem('employeeId'));

    return <GlobalContext.Provider value={{monthIndex, setMonthIndex, token, setToken, employeeId, setEmployeeId}}>
        {children}
        </GlobalContext.Provider>;
}