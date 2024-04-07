import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { MdDeleteOutline } from "react-icons/md";
import HelperToolTip from "./HelperToolTip";

export default function LeaveHistory() {
  const token = useContext(GlobalContext).token;
  const employeeId = useContext(GlobalContext).employeeId;

  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const getLeaveHistory = async () =>
      fetch(
        `http://localhost:8080/leaves/by-empId/${employeeId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          result.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
          setLeaveHistory(result);
          console.log(result);
        })
        .catch((error) => console.error(error));
    getLeaveHistory();
  }, []);

  const handleDelete = (leaveId) => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    fetch(
      `http://localhost:8080/leaves/delete-leave/${leaveId}`,
      requestOptions
    )
      .then((response) => {
        console.log("deleted response:", response);
        response.json();
      })
      .then((result) => {
        console.log("deleted result:", result);
        setLeaveHistory(
          leaveHistory.filter((leave) => leave.requestId !== leaveId)
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div>
        <div className="flex flex-col lg:w-full">
          <div className="flex flex-col w-full h-screen gap-4 px-4 justify-start scroll whitespace-nowrap overflow-y-auto">
            <p className="text-2xl text-white font-bold w-full self-start">
              Leave History
            </p>
            <div className="grid grid-rows-1 grid-cols-5 text-center text-white font-bold ">
              <p>From</p>
              <p>To</p>
              <p>Status</p>
              <p>Actions</p>
              <p>Manager Feedback</p>
            </div>
            {leaveHistory &&
              leaveHistory.map((leave) => (
                <div
                  key={leave.requestId}
                  className=" grid grid-cols-5 py-4 items-center justify-center text-center bg-gray-200 rounded-lg"
                >
                  {" "}
                  <p>
                    {new Date(leave.startDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    {new Date(leave.endDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p>{leave.status}</p>
                  <div className="flex flex-row gap-4 w-full justify-center cursor-pointer">
                    <button onClick={() => handleDelete(leave.requestId)} className="relative group">
                      <MdDeleteOutline />
                      <HelperToolTip text="Delete" />
                    </button>
                  </div>
                  <div>
                    {leave.managerFeedback ? (
                      <p>{leave.managerFeedback}</p>
                    ) : (
                      <p>No feedback yet</p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
