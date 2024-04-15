import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { setLocalStorageItems } from "../utils/Utils";

export default function LoginForm() {
  const [loginData, setLoginData] = useState({});
  const [formDataFinal, setFormDataFinal] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [departments, setDepartments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    setFormDataFinal(data);
    console.log(data);
  };

  useEffect(() => {
    if (loginData && loginData.jwtToken && loginData.userDetails && departments) {
      console.log(loginData.userDetails.departmentId)
      const deptName = departments.find(dept => dept.departmentId === loginData.userDetails.departmentId).departmentName;
      const saved = setLocalStorageItems(loginData,deptName);
      if(saved){
        window.location.href = "/";
      }
    }
  }, [loginData,departments]);



  useEffect(() => {
    const loginEmployee = async () => {
      setSubmitting(true);
  
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDataFinal),
        };
        const response = await fetch("http://localhost:8080/auth/login-employee", requestOptions);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.errMsg || "Unknown error occurred");
        }
        const data = await response.json();
        setLoginData(data);
        setSubmitting(false);
      } catch (error) {
        console.log("Error:", error.message);
        setErrorMessage(error.message);
        setSubmitting(false);
      }
    };
  
    const getDepts = async () => {
      try {
        const response = await fetch("http://localhost:8080/departments/all");
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
  
    if (Object.keys(formDataFinal).length !== 0) {
      Promise.all([getDepts(), loginEmployee()])
        .then(() => {
          // Both fetch operations completed successfully
          console.log("All fetch operations completed successfully");
        })
        .catch((error) => {
          // Handle errors from either fetch operation
          console.log("Error:", error.message);
        });
    }
  }, [formDataFinal]);
  


  

  return (
    <Layout>
      <>
        <div className="flex flex-col items-center justify-top w-full h-screen text-white">
          <form
            className="flex flex-col lg:p-8 md:p-8 p-4 m-8 bg-gray-800 drop-shadow-lg rounded-lg lg:w-1/2 items-center justify-center gap-3 font-semibold"
            onSubmit={(e) => handleSubmit(e)}
          >
            <h1 className="text-3xl font-bold">Login Form</h1>
            <div className="grid grid-cols-2 grid-rows-1">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username or Email"
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
            <button className="self-center p-3 px-6 bg-blue-400 rounded-lg" disabled={submitting}>
              {submitting ? "Logging in" : "Log in"}
            </button>
            {errorMessage && <span className="text-red-500 font-normal">{errorMessage}</span>}
            <p className="text-center text-gray-400 font-normal">
              Don&apos;t have an account ? <span> </span>
              <a href="/register" className="text-blue-700 font-normal">
                Register here.
              </a>
            </p>
          </form>
        </div>
      </>
    </Layout>
  );
}
