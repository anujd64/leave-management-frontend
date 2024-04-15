import { useEffect, useState } from "react";
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function LeaveBalance(
  className
) {
  const [approvedLeavesData, setApprovedLeavesData] = useState([]);

  const token = useContext(GlobalContext).token;
  const employeeId = useContext(GlobalContext).employeeId;

  const totalLeavesAllowed = 18;

  useEffect(() => {
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      const fetchApproveLeaves = () =>
        fetch(
          `http://localhost:8080/leaves/by-empId/${employeeId}/approved`,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            setApprovedLeavesData(data);
            console.log(data);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      fetchApproveLeaves();
    }
  }, []);

  return (
    <>
      <div className="flex flex-row w-full">
        <h1 className="text-2xl px-4 font-bold text-white">Leave Balance</h1>
      </div>
      <div className="flex flex-row items-center justify-evenly gap-4 p-4">
        <Tile
          text="Approved Leaves"
          number={approvedLeavesData.length}
          color="text-green-500"
          />
        <Tile
          text="Remaining Leaves"
          number={totalLeavesAllowed - approvedLeavesData.length}
          color="text-yellow-500"
          />
        <Tile text="Total Leaves" number={totalLeavesAllowed}
          color="text-blue-500"
          />
      </div>
    </>
    
  );
}

export function Tile({ text, number, color }) {

  const getStatusColor = () => {
    return color;
  };

  return (
    <div
      className={`flex flex-col gap-4 lg:w-56 w-40 h-20 rounded-lg drop-shadow-lg bg-gray-800 items-center justify-center text-center text-white lg:text-lg text-sm font-bold`}
    >
      <div className="flex items-center justify-center lg:gap-4 gap-2 lg:flex-nowrap flex-wrap">
      <p>{text}</p>
      <p className={`${getStatusColor()}`}>{number}</p>
      </div>
    </div>
  );
}
