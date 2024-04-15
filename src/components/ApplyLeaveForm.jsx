import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

const LeaveRequestForm = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = useContext(GlobalContext).token;

  const [leaveRequest, setLeaveRequest] = useState({
    leaveTypeId: "",
    startDate: "",
    endDate: "",
    reason: "",
    employeeId: useContext(GlobalContext).employeeId,
    status: "pending",
    managerFeedback: "",
    createdAt: "",
    updatedAt: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [holidayData, setHolidayData] = useState([]);
  const holidays = holidayData.map((holiday) => holiday.holidayDate);

  useEffect(() => {
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
    getHolidays();
  }, []);

  useEffect(() => {
    const getLeaveTypes = () =>
      fetch("http://localhost:8080/leave-types/all")
        .then((response) => response.json())
        .then((result) => {
          setLeaveTypes(result);
        })
        .catch((error) => console.error(error));
    getLeaveTypes();
  }, []);

  useEffect(() => {
    const currentDate = new Date().toISOString();
    setLeaveRequest((prevState) => ({
      ...prevState,
      createdAt: currentDate,
      updatedAt: currentDate,
    }));
  }, []);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSubmit = debounce(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(leaveRequest),
      };

      fetch("http://localhost:8080/leaves/create-leave", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setIsSubmitting(false);
          if(result.errMsg){
            setErrorMessage(result.errMsg);
            return;
          }
          setSuccessMessage("Leave request submitted successfully.");
          console.log(result);
        })
        .catch((error) => {
          setIsSubmitting(false);
          setErrorMessage(error.errMsg || "Unknown error occurred");
          console.error(error);
          console.error(error.errMsg);
        });
    }
  }, 500);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
  
    const { startDate, endDate } = leaveRequest;
  
    // Ensure start date and end date are not empty
    if (!startDate || !endDate) {
      setErrorMessage("Start date and end date are required");
      return;
    }
  
    const today = dayjs();
  
    // Convert start and end dates to Day.js objects
    const startDateObj = dayjs(startDate);
    const endDateObj = dayjs(endDate);
    const isStartLessThanToday = startDateObj.isBefore(today,'day');
    const isEndLessThanToday = endDateObj.isBefore(today,'day');
  
    // Check if start date or end date is less than today
    if (isStartLessThanToday || isEndLessThanToday) {
      setErrorMessage(`${ isStartLessThanToday ? "start date": "end date"} cannot be less than today`);
      return;
    }

    // Check if start date is after end date
    if (startDateObj.isAfter(endDateObj, 'day')) {
      setErrorMessage("Start date cannot be after end date");
      return;
    }
  
    // Check if the difference between start and end dates is more than 7 days
    const differenceInDays = endDateObj.diff(startDateObj, 'day');
    if (differenceInDays > 7) {
      setErrorMessage("Maximum leave duration is 7 days");
      return;
    }
  
    const isStartDateHoliday = holidays.includes(startDate);
    const isEndDateHoliday = holidays.includes(endDate);
  
    if (isStartDateHoliday || isEndDateHoliday) {
      setErrorMessage(`Leave cannot be applied for on holidays, ${isEndDateHoliday ? "end date" : "start date"} is a holiday`);
      return;
    }

    console.log("Leave Request Data: ", leaveRequest);
  
    // If all checks pass, proceed with submitting the leave request
    debouncedSubmit();
  };

  return (
    <>
      
          <form
            onSubmit={handleSubmit}
            className="w-1/3 mx-auto mt-8 shadow-md p-6 my-8 bg-white rounded-md"
          >
            <h2 className="text-lg font-semibold mb-4">Leave Request Form</h2>
            <div className="mb-4">
              <label
                htmlFor="leaveTypeId"
                className="block text-sm font-medium "
              >
                Leave Type:
              </label>
              <select
                id="leaveTypeId"
                name="leaveTypeId"
                value={leaveRequest.leaveTypeId}
                onChange={handleChange}
                className="px-2 py-2  mt-1 w-full rounded-md"
              >
                {leaveTypes &&
                  leaveTypes.map((leaveType) => (
                    <option
                      className="text-black p-1"
                      key={leaveType.leaveTypeId}
                      value={leaveType.leaveTypeId}
                    >
                      {leaveType.leaveTypeName}: {leaveType.defaultAllowance} days
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="startDate" className="block text-sm font-medium ">
                Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={leaveRequest.startDate}
                onChange={handleChange}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 px-2 py-3 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="endDate" className="block text-sm font-medium ">
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={leaveRequest.endDate}
                onChange={handleChange}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 px-2 py-3 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="reason" className="block text-sm font-medium">
                <div className="flex gap-2">
                Reason:
                </div>
              </label>
              <textarea
                id="reason"
                name="reason"
                value={leaveRequest.reason}
                onChange={handleChange}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 px-2 py-3 border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              ></textarea>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          {successMessage && (
            <div className="text-green-500 text-center mt-4">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="text-red-500 text-center mt-4">{errorMessage}</div>
          )}
          </form>
    </>
  );
};

export default LeaveRequestForm;
