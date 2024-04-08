import Layout from "../components/Layout";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { MdDeleteOutline } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";
import Modal from "../components/Modal";
import HelperToolTip from "../components/HelperToolTip";
export default function ManageLeaves() {
  const token = useContext(GlobalContext).token;
  const employeeId = useContext(GlobalContext).employeeId;
  const deptId = useContext(GlobalContext).departmentId;
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);



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
        const filteredLeaveHistory = data.leaveRequests.filter((leave) => leave.employeeId !== employeeId);
        setLeaveHistory(filteredLeaveHistory);
        setEmpDetails(data.employeeIdUsernames);
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
              ? { ...leave, status: "rejected" }
              : leave
          )
        );
      })
      .catch((error) => console.error(error));
  };

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
    <Layout>
      <div className="w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full h-screen gap-4 px-4 justify-start scroll whitespace-nowrap overflow-y-auto">
            <p className="text-2xl text-white font-bold w-full self-start">
              Manage Leaves
            </p>
            <div className="grid grid-rows-1 grid-cols-7 text-center text-white font-bold ">
              <p>Employee Name</p>
              <p>From</p>
              <p>To</p>
              <p>Status</p>
              <p>Reason</p>
              <p>Your Feedback</p>
              <p>Actions</p>
            </div>
            {leaveHistory &&
              leaveHistory.map((leave,idx) => (
                <div
                  key={idx}
                  className=" grid grid-cols-7 py-4 items-center justify-center text-center bg-gray-200 rounded-lg"
                >
                  <p>{empDetails[leave.employeeId]}</p>
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
                  <p>{leave.reason ? leave.reason : "NA"}</p>
                  <p>{leave.managerFeedback}</p>

                    
                  <div className="flex flex-row gap-4 w-full justify-center cursor-pointer">
                    {leave.status !== "approved" &&
                      leave.status !== "rejected" && (
                        <>
                        <button onClick={() => handleApprove(leave.requestId)} className="group relative">
                          <IoCheckmarkSharp />
                        <HelperToolTip text="Approve"/>
                        </button>
                        </>
                        
                      )}
                    {leave.status !== "rejected" && 
                    (<> 
                    <Modal
                      handleReject={handleReject}
                      requestId={leave.requestId}
                      />
                      </> 
                    )}

                    <button onClick={() => handleDelete(leave.requestId)} className="group relative">
                      <MdDeleteOutline />
                      <HelperToolTip text="Delete"/>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
