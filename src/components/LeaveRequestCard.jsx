import { useState } from "react";
import { IoCheckmarkSharp, IoCloseOutline } from "react-icons/io5";
import StatusIndicator from "../components/StatusIndicator";
import RejectionModal from "../components/RejectionModal";
import LeaveDetails from "../components/LeaveDetails";
import dayjs from "dayjs";

export default function LeaveRequestCard({
  employeeDetails,
  leave,
  holidayData,
  handleApprove,
  handleReject,
}) {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    setReason(e.target.value);
  };

  const handleRejectClick = () => {
    handleReject(leave.requestId, reason);
    setShowModal(false);
    setReason("");
  };


  // Function to filter out holidays and weekends from the leave period
const filterHolidays = (startDate, endDate, holidays) => {
  let filteredDates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    if (!isWeekend(currentDate) && !isHoliday(currentDate, holidays)) {
      filteredDates.push(currentDate);
    }
    currentDate = currentDate.add(1, 'day');
  }
  return filteredDates;
};

// Function to check if a given date is a weekend (Saturday or Sunday)
const isWeekend = (date) => {
  const dayOfWeek = date.day();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

// Function to check if a given date is a holiday
const isHoliday = (date, holidays) => {
  const dateString = date.format("YYYY-MM-DD");
  return holidays.some(holiday => holiday.holidayDate === dateString);
};

const filteredLeaveDates = filterHolidays(dayjs(leave.startDate), dayjs(leave.endDate), holidayData);

const leaveDuration = filteredLeaveDates.length;

  return (
    <>
      <div className="relative px-4 py-4 w-72 h-fit max-h-[400px] flex flex-col gap-3 bg-gray-200 rounded-lg justify-top items-center">
        <StatusIndicator status={leave.status} />

        <LeaveDetails employeeDetails={employeeDetails} leave={leave} leaveDuration={leaveDuration} />

        {leave.status === "pending" && (
          <div className="flex flex-row gap-4 w-full justify-center">
            <button
              onClick={() => handleApprove(leave.requestId)}
              className="w-1/2 flex flex-row items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <IoCheckmarkSharp />
              <p>Approve</p>
            </button>
            <button
              onClick={toggleModal}
              className="w-1/2 flex flex-row items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <IoCloseOutline />
              <p>Reject</p>
            </button>
          </div>
        )}
      <RejectionModal
        showModal={showModal}
        handleInputChange={handleInputChange}
        handleRejectClick={handleRejectClick}
        reason={reason}
        toggleModal={toggleModal}
      />
      </div>

    </>
  );
}
