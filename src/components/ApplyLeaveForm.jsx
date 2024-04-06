// ApplyLeaveForm.jsx

import React, { useState } from 'react';
import './ApplyLeaveForm.css'; // Import CSS file

const ApplyLeaveForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your logic here to handle form submission
    console.log('Form submitted:', { startDate, endDate, leaveType, leaveReason });
  };

  return (
    <div className="apply-leave-form-container">
      <div className="apply-leave-form">
        <h2>Apply Leave</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="leaveType">Leave Type:</label>
            <select
              id="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Annual">Annual</option>
              <option value="Sick">Sick</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="leaveReason">Leave Reason:</label>
            <textarea
              id="leaveReason"
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveForm;
