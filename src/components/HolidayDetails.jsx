import { useEffect, useState } from "react";
export default function HolidayDetails() {
  const [holidayData, setHolidayData] = useState([]);
  const token = localStorage.getItem("token");

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
    getHolidays();
  }, []);

  return (
    <div className="flex flex-col w-1/2">
      <div className="flex flex-col w-full h-screen gap-4 px-4 justify-start scroll whitespace-nowrap overflow-y-auto">
        <p className="text-2xl text-white font-bold w-full self-start px-2 py-4">
          List of Company Holidays
        </p>
        {holidayData &&
          holidayData.map((holiday) => (
            <div
              key={holiday.holidayId}
              className="flex flex-row justify-between w-[90%] p-4 bg-gray-200 border drop-shadow-lg rounded-lg"
            >
              <p>{holiday.description}</p>
              <p>{holiday.holidayDate}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
