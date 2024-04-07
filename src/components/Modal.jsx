import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import HelperToolTip from './HelperToolTip';

const Modal = ({ handleReject, requestId }) => {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    setReason(e.target.value);
  };

  const handleRejectClick = () => {
    handleReject(requestId, reason);
    setShowModal(false);
    setReason('');
  };

  return (
    <div className="group relative">
      <button onClick={toggleModal}>
        <IoCloseOutline />
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content flex flex-col gap-2">
            <h2>Reason for rejection</h2>
            <input
              type="text"
              className='px-2 py-1 border border-gray-300 rounded-md w-full'
              value={reason}
              onChange={handleInputChange}
              placeholder="Enter reason"
            />
            <button className='bg-red-400 rounded-md' onClick={handleRejectClick}>Reject</button>
          </div>
        </div>
      )}

<HelperToolTip text="Reject"/>
    </div>
  );
};

export default Modal;
