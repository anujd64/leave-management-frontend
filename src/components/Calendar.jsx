import React, { useEffect, useState, useContext } from 'react';
import Month from './Month';
import CalendarHeader from './CalendarHeader';
import dayjs from 'dayjs';
import { getMonth } from '../utils/CalendarUtils';
import GlobalContext from '../context/GlobalContext';
export default function Calendar() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const token = useContext(GlobalContext).token;

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

  const [holidayData, setHolidayData] = useState([]);

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
          setHolidayData(result);
          console.log(result);
        })
        .catch((error) => console.error(error));
    getHolidays();
  }, []);
  

  return (
    <>
    <div className='flex flex-col h-full py-4 w-[85%] items-center justify-center'>
    <CalendarHeader currentMonth={currentMonth} increment={increment} decrement={decrement} handleClick={handleTodayClick} />
    {currentMonth && <Month month={currentMonth} holidayData={holidayData} />}
    </div>
    </>
  )
}
