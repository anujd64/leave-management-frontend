import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { setLocalStorageItems } from "../utils/Utils";

export default function RegisterForm() {
  const [departments, setDepartments] = useState([]);
  const [formDataFinal, setFormDataFinal] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.confirmPassword.value) {
      setErrorMessage("Passwords do not match");
      return;
    }
    
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {

      if (key !== "confirmPassword") {
        data[key] = value;
      }
    });
    data["managerId"] = null;
    setFormDataFinal(data);
    console.log(data);
  };

  useEffect(() => {
    const createEmployee = async () => {
      setSubmitting(true);
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
        }else{
          const data = await response.json();
          if(data){
            setLocalStorageItems(data);
            window.location.href = "/";
          }
        }
        setSubmitting(false);
      } catch (error) {
        console.log("Error:", error.message);
        setSubmitting(false);
        setErrorMessage(error.message);
      }
    };

    if (Object.keys(formDataFinal).length !== 0) { 
      createEmployee();
    }
    
  }, [formDataFinal]);

  useEffect(() => {

    const fetchDepts = () => fetch("http://localhost:8080/departments/all")
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.log(error));

    fetchDepts();
  }, []);


  return (
    <Layout>
      <div className="flex flex-col items-center justify-top w-full h-screen text-white">
        <form
          className="flex flex-col p-8 lg:px-12 m-8 bg-gray-800 drop-shadow-lg rounded-lg lg:w-1/2 items-center justify-center gap-3 font-semibold"
          onSubmit={(e) => handleSubmit(e)}
        >
        <h1 className="text-3xl font-bold">Register Form</h1>
          <div className="grid grid-cols-2 grid-rows-1">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border-2 px-4 py-2 rounded-lg text-black"
              required
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-1">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border-2 px-4 py-2 rounded-lg text-black"
              required
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-1">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="border-2 px-4 py-2 rounded-lg text-black"
              required
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-1">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border-2 px-4 py-2 rounded-lg text-black"
              required
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-1">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="border-2 px-4 py-2 rounded-lg text-black"
              required
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
            disabled={submitting}
          >
            {submitting ? "Registering" : "Register"}
          </button>
        {errorMessage && <span className="text-red-500 font-normal">{errorMessage}</span>}
        <p className="text-center text-gray-400 font-normal">
          Already have an account ? <span> </span>
          <a href="/login" className="text-blue-700 font-normal">
            Login here.
          </a>
        </p>
        </form>
      </div>
    </Layout>
  );
}
