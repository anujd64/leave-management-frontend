import Layout from "../components/Layout";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import LeaveRequestCard from "../components/LeaveRequestCard";
import { MdRefresh } from "react-icons/md";
import HelperToolTip from "../components/HelperToolTip";

export default function ManageLeaves() {
  const token = useContext(GlobalContext).token;
  const employeeId = useContext(GlobalContext).employeeId;
  const deptId = useContext(GlobalContext).departmentId;
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [filteredLeaveHistory, setFilteredLeaveHistory] = useState([]);
  const [filterName, setFilterName] = useState("all");
  const [empDetails, setEmpDetails] = useState([]);
  const [holidayData, setHolidayData] = useState([]);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const getHolidays = async () =>
    fetch("http://localhost:8080/company-holidays/all", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        result.sort(
          (a, b) => new Date(a.holidayDate) - new Date(b.holidayDate)
        );
        result = result.filter(
          (holiday) => new Date(holiday.holidayDate) >= new Date()
        );
        setHolidayData(result);
        console.log(result);
      })
      .catch((error) => console.error(error));

  useEffect(() => {
    getHolidays();
  }, []);

  const getLeaveHistory = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`http://localhost:8080/leaves/by-dept/${deptId[0]}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch leave history");
        }
        return response.json();
      })
      .then((data) => {
        console.log("leaves:", data);
        const filteredLeaveHistoryX = data.leaveRequests.filter(
          (leave) => leave.employeeId !== employeeId
        );
        filteredLeaveHistoryX.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
        setLeaveHistory(filteredLeaveHistoryX);
        setFilteredLeaveHistory(filteredLeaveHistoryX);
        setEmpDetails(data.employeeDetails);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getLeaveHistory();
  }, []);

  const handleApprove = (leaveId) => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({ status: "approved", updatedAt: new Date() }),
    };

    fetch(
      `http://localhost:8080/leaves/update-leave/${leaveId}`,
      requestOptions
    )
      .then((response) => {
        response.json();
      })
      .then((result) => {
        console.log("approved result:", result);
        setLeaveHistory(
          leaveHistory.map((leave) =>
            leave.requestId === leaveId
              ? { ...leave, status: "approved" }
              : leave
          )
        );
        setFilteredLeaveHistory(
          leaveHistory.map((leave) =>
            leave.requestId === leaveId
              ? { ...leave, status: "approved" }
              : leave
          )
        );

        setFilterName("all");
      })
      .catch((error) => console.error(error));
  };

  const handleReject = (requestId, reason) => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        status: "rejected",
        managerFeedback: reason,
        updatedAt: new Date(),
      }),
    };

    fetch(
      `http://localhost:8080/leaves/update-leave/${requestId}`,
      requestOptions
    )
      .then((response) => {
        response.json();
      })
      .then((result) => {
        console.log("updated result:", result);
        setLeaveHistory(
          leaveHistory.map((leave) =>
            leave.requestId === requestId
              ? { ...leave, status: "rejected", managerFeedback: reason }
              : leave
          )
        );
        setFilteredLeaveHistory(
          leaveHistory.map((leave) =>
            leave.requestId === requestId
              ? { ...leave, status: "rejected", managerFeedback: reason }
              : leave
          )
        );

        setFilterName("all");
      })
      .catch((error) => console.error(error));
  };

  const filterLeaveHistory = (status) => {
    return () => {
      setFilterName(status);
      if (status === "all") {
        setFilteredLeaveHistory(leaveHistory);
      } else {
        const filteredLeaveHistory = leaveHistory.filter(
          (leave) => leave.status === status
        );
        setFilteredLeaveHistory(filteredLeaveHistory);
      }
    };
  };

  // const handleDelete = (leaveId) => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("authorization", `Bearer ${token}`);
  //   myHeaders.append("Content-Type", "application/json");

  //   const requestOptions = {
  //     method: "DELETE",
  //     headers: myHeaders,
  //   };

  //   fetch(
  //     `http://localhost:8080/leaves/delete-leave/${leaveId}`,
  //     requestOptions
  //   )
  //     .then((response) => {
  //       console.log("deleted response:", response);
  //       response.json();
  //     })
  //     .then((result) => {
  //       console.log("deleted result:", result);
  //       setLeaveHistory(
  //         leaveHistory.filter((leave) => leave.requestId !== leaveId)
  //       );
  //     })
  //     .catch((error) => console.error(error));
  // };

  const handleRefresh = () => {
    getLeaveHistory();
  };

  return (
    <Layout>
      <div className="flex flex-col w-full h-full px-8 py-2 select-none">
        <div className="flex flex-col flex-wrap w-full h-full gap-4">
          <div className="flex justify-between">
            <p className="text-2xl text-white font-bold w-full text-start">
              Manage Leaves
            </p>

            <button
              onClick={handleRefresh}
              className="relative group text-white"
            >
              <MdRefresh />
              <HelperToolTip text="Refresh" />
            </button>
          </div>

          <div className="flex flex-row gap-4">
            <p
              className={`self-start rounded-full border text-xs w-fit h-fit px-4 py-2 border-gray-200 text-gray-300 cursor-pointer
            ${filterName === "all" ? "bg-gray-300 text-gray-800" : ""}`}
              onClick={filterLeaveHistory("all")}
            >
              All
            </p>
            <p
              className={`self-start rounded-full border text-xs w-fit h-fit px-4 py-2 border-green-300 text-green-500 cursor-pointer ${
                filterName === "approved" ? "bg-green-300 text-green-800" : ""
              }`}
              onClick={filterLeaveHistory("approved")}
            >
              Approved
            </p>
            <p
              className={`self-start rounded-full border text-xs w-fit h-fit px-4 py-2 border-yellow-300 text-yellow-500 cursor-pointer
            ${filterName === "pending" ? "bg-yellow-300 text-yellow-800" : ""}`}
              onClick={filterLeaveHistory("pending")}
            >
              Pending
            </p>
            <p
              className={`self-start rounded-full border text-xs w-fit h-fit px-4 py-2 border-red-300 text-red-500 cursor-pointer
            ${filterName === "rejected" ? "bg-red-300 text-red-800" : ""}`}
              onClick={filterLeaveHistory("rejected")}
            >
              Rejected
            </p>
          </div>

          <div className="flex flex-row gap-4 flex-wrap w-full justify-evenly">
            {filteredLeaveHistory.length > 0 ? (
              <>
                {filteredLeaveHistory.map((leave, idx) => (
                  <LeaveRequestCard
                    key={idx}
                    employeeDetails={empDetails[leave.employeeId]}
                    leave={leave}
                    holidayData={holidayData}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                  />
                ))}
              </>
            ) : (
              <p className="text-zinc-400 py-4 text-center">
                No leave requests to manage
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
