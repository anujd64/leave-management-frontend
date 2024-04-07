import Day from "./Day";
export default function Month({ month, holidayData }) {
    console.log("month",month);
  return (
    <div className="grid grid-cols-7 w-full h-full bg-white rounded-lg grid-rows-5">
      {month.map((row, i) => (
        <>
        
          {
          row.map((day, idx) => (
            
            <Day day={day} key={idx} rowIdx={i} holidayData={holidayData} />
          ))}
        </>
      ))}
    </div>
  );
}

