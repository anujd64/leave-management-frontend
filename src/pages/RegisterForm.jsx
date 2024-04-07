import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function RegisterForm() {
  const [departments, setDepartments] = useState([]);
  const [formDataFinal, setFormDataFinal] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    data["managerId"] = null;
    setFormDataFinal(data);
    console.log(data);
  };

  useEffect(() => {
    const createEmployee = async () => {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDataFinal),
        };
        const response = await fetch("http://localhost:8080/auth/create-employee", requestOptions);
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.errMsg || "Unknown error occurred");
        }
        const data = await response.json();
        if(data){
          window.location.href = "/login";
        }
      } catch (error) {
        console.log("Error:", error.message);
        setErrorMessage(error.message);
      }
    };

    if (Object.keys(formDataFinal).length !== 0) { 
      createEmployee();
    }
    
  }, [formDataFinal]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const fetchDepts = () => fetch("http://localhost:8080/departments/all")
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.log(error));

    fetchDepts();
  }, []);


  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full h-screen text-white">
        <h1 className="text-3xl font-bold">Register Form</h1>
        <form
          className="flex flex-col py-4 w-2/4 items-center justify-center gap-3 font-semibold"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid grid-cols-2 grid-rows-1">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border-2 px-4 py-2 rounded-lg text-black"
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-1">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border-2 px-4 py-2 rounded-lg text-black"
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-1">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="border-2 px-4 py-2 rounded-lg text-black"
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-1">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border-2 px-4 py-2 rounded-lg text-black"
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-1">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="border-2 px-4 py-2 rounded-lg text-black"
            />
          </div>
          <div className="grid grid-rows-1 grid-cols-3 gap-4">
            <div className="grid grid-cols-1 grid-rows-1 gap-4">
              <label>Gender</label>
              <select
                className="border-2 px-4 py-2 rounded-lg text-black"
                name="gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 grid-rows-1">
              <label>Department</label>
              <select
                className="border-2 px-4 py-2 rounded-lg text-black"
                name="departmentId"
              >
                {departments.map((department) => (
                  <option
                    className="text-black bg-gray-100"
                    key={department.departmentId}
                    value={department.departmentId}
                  >
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 grid-rows-1">
              <label>Are you a Manager</label>
              <select
                className="border-2 px-4 py-2 rounded-lg text-black"
                defaultValue={false}
                name="isManager"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <button
            className=" self-center p-3 px-6 bg-blue-400 rounded-lg"
            type="submit"
          >
            Register
          </button>
        </form>
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        <p className="text-center text-gray-400">
          Already have an account ? <span> </span>
          <a href="/login" className="text-blue-700">
            Login here.
          </a>
        </p>
      </div>
    </Layout>
  );
}
