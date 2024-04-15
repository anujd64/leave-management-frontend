import { IoCloseOutline } from "react-icons/io5";

export default function RejectionModal({
  showModal,
  handleInputChange,
  handleRejectClick,
  reason,
  toggleModal,
}) {
  const isReasonEmpty = reason.trim() === '';

  return (
    <div className={`absolute flex z-50 w-[95%] my-2 h-1/2 bottom-0 rounded-xl justify-center items-center backdrop-blur-lg transition-opacity duration-300 ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="modal-content w-[250px] flex flex-col gap-2">
        <div className="flex flex-row items-center font-bold justify-between">
          <h2>Reason for rejection</h2>
          <IoCloseOutline className="cursor-pointer" onClick={toggleModal} />
        </div>
        <input
          type="text"
          className="px-2 py-1 border border-gray-300 rounded-md w-full"
          value={reason}
          onChange={handleInputChange}
          placeholder="Enter reason"
          required
        />
        <button
          className={`bg-red-500 text-white py-2 rounded-md ${isReasonEmpty ? 'opacity-70' : ''}`}
          onClick={handleRejectClick}
          disabled={isReasonEmpty}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
