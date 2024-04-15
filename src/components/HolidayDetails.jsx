import { useEffect, useState, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
export default function HolidayDetails() {
  const [holidayData, setHolidayData] = useState([]);
  const token = useContext(GlobalContext).token;

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
        result.sort(
          (a, b) => new Date(a.holidayDate) - new Date(b.holidayDate)
        );
        result = result.filter(
          (holiday) => new Date(holiday.holidayDate) >= new Date()
        );
        setHolidayData(result);
        console.log(result);
      })
      .catch((error) => console.error(error));

  useEffect(() => {
    getHolidays();
  }, []);

  return (
    <div className="flex flex-col w-[30%] px-4 gap-4">
      <p className="text-2xl text-white font-bold w-full px-4 py-2">
        List of Company Holidays
      </p>
      <div className="flex flex-col justify-top items-center w-full lg:h-[80vh] gap-4 scroll whitespace-nowrap overflow-y-auto no-scrollbar">
        {holidayData.length > 0 ? (
          holidayData.map((holiday) => (
            <div
              key={holiday.holidayId}
              className="flex flex-row justify-between w-[90%] p-4 bg-gray-200 border drop-shadow-lg rounded-lg"
            >
              <p>{holiday.description}</p>
              <p>
                {new Date(holiday.holidayDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          ))
        ) : (
          <p className="text-zinc-400 py-4">No upcoming holidays</p>
        )}
      </div>
    </div>
  );
}
