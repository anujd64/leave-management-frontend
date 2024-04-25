import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { setLocalStorageItems } from "../utils/Utils";
import { FaPen } from "react-icons/fa6";
import LeaveBalance from "../components/LeaveBalance";
import GlobalContext from "../context/GlobalContext";

const ProfilePage = () => {
  const userData = JSON.parse(localStorage.getItem("profileData"));
  const deptName = localStorage.getItem("departmentName");

  const [editingMode, setEditingMode] = useState(false);
  const [formDataFinal, setFormDataFinal] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const empId = useContext(GlobalContext).employeeId;
  const token = useContext(GlobalContext).token;

  const handleSaveClick = (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirmPassword.value) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      if (key !== "confirmPassword" && value !== "") {
        data[key] = value;
      }
    });
    console.log(data);
    setFormDataFinal(data);
  };

  useEffect(() => {
    const updateEmployee = async () => {
      setSubmitting(true);
      try {
        const requestOptions = {
          method: "PUT",
          headers: {"Content-Type": "application/json" , "authorization": `Bearer ${token}`} ,
          body: JSON.stringify(formDataFinal),
        };
        const response = await fetch(
          `http://localhost:8080/employees/${empId}`,
          requestOptions
        );
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.errMsg || "Unknown error occurred");
        } else {
          const data = await response.json();
          if (data) {
            console.log(data);
            setLocalStorageItems({userDetails: data});
          }
        }
        setSubmitting(false);
      } catch (error) {
        console.log("Error:", error.message);
        setSubmitting(false);
        setErrorMessage(error.message);
      }
    };

      if (Object.keys(formDataFinal).length > 0){
        updateEmployee();
      }

  }, [formDataFinal]);

  const handleEditClick = () => {
    setEditingMode(!editingMode);
  };

  if (!userData) {
    // Handle case where user data is not available
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="flex justify-center items-center w-full">
        <div className="w-fit h-fit flex justify-center items-center flex-col lg:px-12 p-8 gap-4 text-white bg-gray-600 font-light rounded-lg overflow-hidden shadow-md">
          {editingMode ? (
            <form
              className="flex flex-col items-center justify-center gap-3 font-semibold"
              onSubmit={handleSaveClick}
            >
              <div className="grid grid-cols-2 grid-rows-1">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder={userData.username}
                  className="border-2 px-4 py-2 rounded-lg text-black"
                />
              </div>
              <div className="grid grid-cols-2 grid-rows-1">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder={userData.email}
                  className="border-2 px-4 py-2 rounded-lg text-black"
                />
              </div>
              <div className="grid grid-cols-2 grid-rows-1">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder={userData.fullName}
                  className="border-2 px-4 py-2 rounded-lg text-black"
                />
              </div>
              <div className="grid grid-cols-2 grid-rows-1">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className="border-2 px-4 py-2 rounded-lg text-black"
                />
              </div>
              <div className="grid grid-cols-2 grid-rows-1">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  className="border-2 px-4 py-2 rounded-lg text-black"
                />
              </div>
              <div className="grid grid-rows-1 grid-cols-1 gap-4">
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
              </div>
              {errorMessage && (
                <span className="text-red-500 font-normal">{errorMessage}</span>
              )}

              <button
                type="submit"
                className="w-[150px] inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="px-6 py-4 flex flex-col gap-4">
              <div className="font-bold text-xl mb-1">
                {userData.fullName}
                <p className="text-gray-200 font-normal text-sm">
                  @{userData.username}
                </p>
              </div>
              <p className="">
                Role: {userData.isManager ? "Manager" : "Employee"}
              </p>
              <p className="">Email : {userData.email}</p>
              <p className="">Department : {deptName}</p>
              <LeaveBalance className="flex-col" />
            </div>
          )}

          <div className={`justify-center items-center flex gap-4`}>
            {
              <button
                className={`w-[150px] inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  !editingMode
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                onClick={handleEditClick}
              >
                {editingMode ? "Cancel" : "Edit Profile"}
              </button>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
