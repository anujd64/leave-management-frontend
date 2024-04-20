import dayjs from "dayjs";
import { useState } from "react";

export default function LeaveDetails({
  employeeDetails,
  leave,
  leaveDuration,
}) {
  const [imageSelected, setImageSelected] = useState("");

  return (
    <>
      {imageSelected && (
        <div
          className="fixed top-0 left-0 z-80 p-8 w-screen h-screen bg-black/70 flex justify-center items-center object-cover z-50 backdrop-blur-sm"
          onClick={() => setImageSelected(null)}
        >
          <img
            src={imageSelected}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <div className="flex flex-row w-full px-3 justify-between">
        <p>{employeeDetails.fullName}</p>
        <p className="text-gray-700">
          {dayjs(leave.createdAt).format("MMMM DD, YYYY")}
        </p>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col justify-center items-center p-2 rounded-md border border-gray-500">
          <p>From</p>
          {dayjs(leave.startDate).format("MMMM DD, YYYY")}
        </div>

        <div className="flex flex-col justify-center items-center p-2 rounded-md border border-gray-500">
          <p>To</p>
          {dayjs(leave.endDate).format("MMMM DD, YYYY")}
        </div>
      </div>
      <p className="text-start flex w-full">
        Requested leaves: {leaveDuration} days
      </p>
      <p className="text-start flex w-full">
        Leaves available: {18 - employeeDetails.approvedLeaveCount}
      </p>
      {leave.reason && (
        <div className="flex flex-col w-full border border-gray-500 rounded-md">
          <p className="p-2">Reason</p>
          <span className="h-[1px] w-full bg-slate-500"></span>
          <p className="p-2 text-gray-00 line-clamp-4 text-wrap">
            {leave.reason}
          </p>
        </div>
      )}
      {leave.managerFeedback && (
        <div className="flex flex-col w-full border border-gray-500 rounded-md">
          <p className="p-2">Your Feedback</p>
          <span className="h-[1px] w-full bg-slate-500"></span>
          <p className="p-2 text-gray-700 line-clamp-4 text-wrap">
            {leave.managerFeedback}
          </p>
        </div>
      )}

      {leave.images && leave.images.length > 0 && (
        <div className="flex flex-col w-full border border-gray-500 rounded-md">
          <p className="p-2">Attachments</p>
          <span className="h-[1px] w-full bg-slate-500"></span>
          <div className="flex flex-row gap-2 p-2">
            {leave.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="attachment"
                onClick={() => setImageSelected(image)}
                className="w-16 h-16 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
