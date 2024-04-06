import { useEffect, useState } from "react";

export default function LeaveBalance() {
  const [approvedLeavesData, setApprovedLeavesData] = useState([]);
  const [leavesData, setLeavesData] = useState([]);
  const employeeId = localStorage.getItem("employeeId");
  const token = localStorage.getItem("token");
  useEffect(() => {
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

    const fetchAllLeaves = () =>
      fetch(
        `http://localhost:8080/leaves/by-empId/${employeeId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setLeavesData(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    fetchAllLeaves();
  }, []);

  return (
    <div className="flex flex-col w-1/2 text-white">
      <div className="flex flex-row w-full justify-between ">
        <h1 className="text-2xl font-bold">Leave Balance</h1>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full justify-between">
          <p className="text-lg">Total Allowed Leave</p>
          <p className="text-lg">18</p>
        </div>
        <div className="flex flex-row w-full justify-between">
          <p className="text-lg">Leaves Taken</p>
          <p className="text-lg">{approvedLeavesData.length}</p>
        </div>
        <div className="flex flex-row w-full justify-between">
          <p className="text-lg">Leaves Remaining</p>
          <p className="text-lg">{18 - approvedLeavesData.length}</p>
        </div>
      </div>
    </div>
  );
}
