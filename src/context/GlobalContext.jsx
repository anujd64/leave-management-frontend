import React from "react";

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    token: "",
    setToken: (token) => {},
    employeeId: "",
    setEmployeeId: (id) => {},
});

export default GlobalContext;