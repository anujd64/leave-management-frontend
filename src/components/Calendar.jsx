import React, { useEffect, useState, useContext } from 'react';
import Month from './Month';
import CalendarHeader from './CalendarHeader';
import dayjs from 'dayjs';
import { getMonth } from '../utils/CalendarUtils';
import GlobalContext from '../context/GlobalContext';
export default function Calendar() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const increment = () => {
    setMonthIndex(monthIndex + 1);
  }
  const decrement = () => {
    setMonthIndex(monthIndex - 1);
  }

  const handleTodayClick = () => {
    setMonthIndex(dayjs().month());
  }

  return (
    <>
    <div className='flex flex-col items-center justify-center p-4 '>
    <CalendarHeader currentMonth={currentMonth} increment={increment} decrement={decrement} handleClick={handleTodayClick} />
    {currentMonth && <Month month={currentMonth} />}
    </div>
    </>
  )
}
