import React, { useState } from 'react';

function Calendar() {
  const [date, setDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startingDay = firstDayOfMonth.getDay();

  // Create an array to hold the calendar days
  let calendarDays = [];
  // Fill in the days prior to the start of the month with empty slots
  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  // Fill in the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(<div key={day} className="calendar-day">{day}</div>);
  }

  return (
    <div className="flex flex-col w-full h-fit">
      <div className="flex-grow p-4">
        <div className="w-full h-fit mx-auto p-4 border border-gray-300 bg-gray-100 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setDate(new Date(currentYear, currentMonth - 1, 1))} className="text-blue-500 hover:text-blue-700 focus:outline-none">Prev</button>
            <h2 className="text-lg font-bold">{months[currentMonth]} {currentYear}</h2>
            <button onClick={() => setDate(new Date(currentYear, currentMonth + 1, 1))} className="text-blue-500 hover:text-blue-700 focus:outline-none">Next</button>
          </div>
          <div className="grid grid-cols-7 gap-1 p-4">
            {daysOfWeek.map(day => (
              <div key={day} className="calendar-day calendar-header-day text-lg font-semibold">{day}</div>
            ))}
            {calendarDays}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
