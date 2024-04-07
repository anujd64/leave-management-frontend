import dayjs from "dayjs";

export default function Day({day, rowIdx}) {
    const getCurrentDayClass = () => {
        return day.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? 'bg-blue-500 rounded-full' : '';
    }

    return (
        <div className="text-black flex flex-col border border-gray-200 lg:h-24 lg:w-24 rounded-lg">
        <header className="flex-col items-center text-center">  
            {
                rowIdx === 0 && <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
            }
            <p className={`text-sm px-2 py-1.5 w-fit my-1 text-center ${getCurrentDayClass()}`}>{day.format('DD')}</p>
        </header>
    </div>
    
    )
}