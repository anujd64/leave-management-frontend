import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Day({day, rowIdx, holidayData}) {
    const getCurrentDayClass = () => {
        return day.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? 'bg-blue-500 rounded-full' : '';
    }

    // const isSunday = day.format('dddd') === 'Sunday';
    // const isSaturday = day.format('dddd') === 'Saturday';
    // const color = isSunday || isSaturday ? 'text-red-500' : 'text-black';
    

    const [ dayEvents, setDayEvents ] = useState([]);
    
    useEffect(() => {
        const dayEvents = holidayData.filter(holiday => dayjs(holiday.holidayDate).format('YYYY-MM-DD') === day.format('YYYY-MM-DD'));
        setDayEvents(dayEvents);
    }, [holidayData, day]);


    return (
        <div className="text-black flex flex-col border border-gray-200 rounded-lg w-full">
        <header className="flex-col items-center w-full text-center justify-center ">  
            {
                rowIdx === 0 && <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
            }
            <p className={`text-sm px-2 py-1.5 w-fit my-1 text-center ${getCurrentDayClass()}`}>{day.format('DD')}</p>
            <div className="flex flex-col items-center w-full">
                {
                    dayEvents.map((event) => (
                        <p key={event.holidayId} className="text-xs text-center w-full py-1 bg-blue-400 rounded-md">{event.description}</p>
                    ))
                }
            </div>
        </header>
    </div>
    
    )
}