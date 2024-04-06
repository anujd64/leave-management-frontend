import { useEffect, useState } from "react";

export default function Dashboard(
    {loginData}
) {
    
    const [leavesData, setLeavesData] = useState([]);

    useEffect(() => {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${loginData.token}`);
        console.log("myHeaders", myHeaders)


        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };


        const getLeaves = () => fetch("http://localhost:8080/leaves/by-empId/"+loginData.employeeId, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            setLeavesData(data);
            console.log("leaves data", data)
        })
        .catch((error) => console.log(error));

        getLeaves();
        
    }, []);

    
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-6xl font-bold">Dashboard Page</h1>
        </div>
    );
}