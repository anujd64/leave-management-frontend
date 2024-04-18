import Layout from "../components/Layout";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { MdDeleteOutline,MdRefresh  } from "react-icons/md";
import HelperToolTip from "../components/HelperToolTip";

export default function LeaveHistory() {
  const token = useContext(GlobalContext).token;
  const employeeId = useContext(GlobalContext).employeeId;

  const [leaveHistory, setLeaveHistory] = useState([]);
  const [imageSelected, setImageSelected] = useState("");


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

  useEffect(() => {
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

  const handleRefresh = () => {
    getLeaveHistory();
  };

  return (
    <>
    <Layout>
    {imageSelected && (
      <div className="fixed top-0 left-0 z-80 p-8 w-screen h-screen bg-black/70 flex justify-center items-center object-cover z-50 backdrop-blur-sm"
      onClick={() => setImageSelected(null)}>          
          <img
          src ={imageSelected} alt="" 
          className="w-full h-full object-contain"
          />
        </div>
    )}
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col h-[90vh] gap-4 px-4 w-[90%] scroll whitespace-nowrap overflow-y-auto">
          <div className="flex justify-between">
            <p className="text-2xl text-white font-bold w-full self-start">
              Leave History
            </p>
            <button onClick={handleRefresh} className="relative group">
              <MdRefresh />
              <HelperToolTip text="Refresh" />
            </button>
          </div>
          <div className="grid grid-rows-1 grid-cols-5 w-full text-center text-white font-bold no-scrollbar">
            <p>From</p>
            <p>To</p>
            <p>Status</p>
            <p>Manager Feedback</p>
            <p>Actions</p>
          </div>
          {leaveHistory.length > 0 ? (
            <>
              {leaveHistory.map((leave) => (

                <div className="bg-gray-300 rounded-lg">

                <div
                  key={leave.requestId}
                  className=" grid grid-cols-5 py-4 text-center"
                >
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
                  
                  <div>
                    {leave.managerFeedback.length !== 0 ? (
                      <p>{leave.managerFeedback}</p>
                    ) : (
                      <p>NA</p>
                    )}
                  </div>
                  <div className="flex flex-row gap-4 w-full justify-center cursor-pointer">
                    <button
                      onClick={() => handleDelete(leave.requestId)}
                      className="relative group"
                    >
                      <MdDeleteOutline />
                      <HelperToolTip text="Delete" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-row flex-wrap items-center font-bold gap-4 px-8 py-2">
                  <p>Attachments :</p>
                  { leave.images.length > 0 && leave.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="attachment"
                        onClick={() => setImageSelected(image)}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ))

                  }
                </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-zinc-400 py-4 text-center">No leaves to show</div>
          )}
        </div>
      </div>
    </Layout>
    </>
  );
}
