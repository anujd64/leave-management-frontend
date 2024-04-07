import { useEffect, useState } from "react";
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function LeaveBalance() {
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
    <div className="flex flex-col w-full text-white">
      <div className="flex flex-row w-full ">
        <h1 className="text-2xl px-4 font-bold">Leave Balance</h1>
      </div>
      <div className="flex flex-row items-center justify-evenly gap-4 p-4">
        <Tile
          text="Approved Leaves"
          number={approvedLeavesData.length}
        />
        <Tile
          text="Remaining Leaves"
          number={totalLeavesAllowed - approvedLeavesData.length}
        />
        <Tile text="Total Leaves" number={totalLeavesAllowed} />
      </div>
    </div>
  );
}

function Tile({ text, number, color }) {
  return (
    <div
      className={`flex flex-col gap-4 w-40 h-40 rounded-lg drop-shadow-lg bg-gray-800 items-center justify-center text-center text-xl font-bold`}
    >
      <p className="">{text}</p>
      <p className="">{number}</p>
    </div>
  );
}
