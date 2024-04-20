import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { FaXmark } from "react-icons/fa6";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { validateDates, fetchData, debounce } from "../utils/Utils";
import { set } from "firebase/database";

const LeaveRequestForm = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageLinks, setImageLinks] = useState([]); 
  const token = useContext(GlobalContext).token;
  const empId = useContext(GlobalContext).employeeId;
  const createdAt = dayjs().format("YYYY-MM-DD");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [holidayData, setHolidayData] = useState([]);
  const holidays = holidayData.map((holiday) => holiday.holidayDate);
  const [leaveRequest, setLeaveRequest] = useState({
    leaveTypeId: "",
    startDate: "",
    endDate: "",
    reason: "",
    employeeId: empId,
    status: "pending",
    managerFeedback: "",
    createdAt: createdAt,
    updatedAt: createdAt,
    images: [],
  });

  //get list of holiays
  //used to avoid applications on holidays
  const getHolidays = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const holidays = await fetchData(
      "http://localhost:8080/company-holidays/all",
      requestOptions
    );
    holidays.sort((a, b) => new Date(a.holidayDate) - new Date(b.holidayDate));
    const filteredHolidays = holidays.filter(
      (holiday) => new Date(holiday.holidayDate) >= new Date()
    );
    setHolidayData(filteredHolidays);
    console.log(filteredHolidays);
  };

  useEffect(() => {
    getHolidays();
  }, []);

  //get list of types of leaves
  const getLeaveTypes = async () => {
    const types = await fetchData("http://localhost:8080/leave-types/all");
    setLeaveTypes(types);
  };
  useEffect(() => {
    getLeaveTypes();
  }, []);

  const debouncedSubmit = debounce(async () => {
    if (!isSubmitting) {
      setIsSubmitting(true);
  
      try {
        let uploadedImageUrls = [];
        if (images.length > 0) {
          setSuccessMessage("Uploading images...");
          uploadedImageUrls = await handleUpload();

          console.log(uploadedImageUrls);

          if (uploadedImageUrls.length === 0) {
            setErrorMessage("An error occurred while uploading images.");
            setIsSubmitting(false);
            return;
          }
        }
  
        // setLeaveRequest((prevState) => ({
        //   ...prevState,
        //   images: uploadedImageUrls,
        // }));

        // Update the images in the leave request object directly
        leaveRequest.images = uploadedImageUrls;
  
        const myHeaders = new Headers();
        myHeaders.append("authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
  
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(leaveRequest),
        };
  
        const response = await fetch("http://localhost:8080/leaves/create-leave", requestOptions);
        const result = await response.json();
        if (result.errMsg) {
          setErrorMessage(result.errMsg);
          setIsSubmitting(false);
          return;
        }
  
        console.log(result);
        setSuccessMessage("Leave request submitted successfully.");
      } catch (error) {
        setErrorMessage(error.errMsg || "Unknown error occurred");
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, 500);
  
  

  // Image upload functions
  //get storage reference to store images in firebase bucket

  const handleImageLinks = (imageUrls) => {
    setLeaveRequest((prevState) => ({
        ...prevState,
        images: imageUrls,
      }));
  };
  
  const storageRef = getStorage();
  const folderName =
    empId + "/" + leaveRequest.startDate + "-" + leaveRequest.endDate;

    const handleUpload = async () => {
      try {
        const uploadTasks = images.map((image, index) => {
          const imageName = `image_${index + 1}`;
          const imageRef = ref(storageRef, `${folderName}/${imageName}`);
          return uploadBytes(imageRef, image);
        });
    
        const uploadResults = await Promise.all(uploadTasks);
    
        const imageUrls = await Promise.all(
          uploadResults.map(async (result) => {
            return await getDownloadURL(result.ref);
          })
        );
    
        // Return the image URLs for further processing
        return imageUrls;
      } catch (error) {
        console.error("Error uploading images:", error);
        setErrorMessage(
          "An error occurred while uploading images. Please try again."
        );
    
        return [];
      }
    };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((image, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit the number of images to 3
    if (images.length + files.length > 3) {
      alert("You can't add more than 3 images.");
      return;
    }

    // Add the new images to the existing ones
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const validDates = validateDates(
      leaveRequest,
      leaveTypes,
      images,
      setErrorMessage,
      holidays
    );

    if (!validDates) {
      return;
    }

    // If all checks pass, proceed with submitting the leave request
    debouncedSubmit();
  };

  const resetForm = () => {
    setLeaveRequest({
      leaveTypeId: "",
      startDate: "",
      endDate: "",
      reason: "",
      employeeId: empId,
      status: "pending",
      managerFeedback: "",
      createdAt: createdAt,
      updatedAt: createdAt,
      images: [],
    });
    setImages([]);
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/3 w-4/5 mx-auto mt-8 shadow-md p-6 my-8 bg-white rounded-md"
      >
        <h2 className="text-lg font-semibold mb-4">Leave Request Form</h2>
        <div className="mb-4">
          <label htmlFor="leaveTypeId" className="block text-sm font-medium ">
            Leave Type:
          </label>
          <select
            id="leaveTypeId"
            name="leaveTypeId"
            value={leaveRequest.leaveTypeId}
            onChange={handleChange}
            className="px-2 py-2  mt-1 w-full rounded-md"
          >
            {leaveTypes &&
              leaveTypes.map((leaveType) => (
                <option
                  className="text-black p-1"
                  key={leaveType.leaveTypeId}
                  value={leaveType.leaveTypeId}
                >
                  {leaveType.leaveTypeName}
                  {/* : {leaveType.defaultAllowance} days */}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium ">
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={leaveRequest.startDate}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 px-2 py-3 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium ">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={leaveRequest.endDate}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 px-2 py-3 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium">
            <div className="flex gap-2">Reason:</div>
          </label>
          <textarea
            id="reason"
            name="reason"
            value={leaveRequest.reason}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 px-2 py-3 border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          ></textarea>
          <label
            htmlFor="imageUpload"
            className="block text-sm font-medium text-gray-700"
          >
            Choose up to 3 images:
          </label>
          <input
            type="file"
            id="imageUpload"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleImageChange}
            multiple
            accept="image/*"
          />

          <div className="flex flex-row flex-wrap w-full gap-4">
            {images.map((image, index) => (
              <>
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-md mr-2"
                />
                <button
                  className="top-2 right-2 text-red-500"
                  onClick={() => removeImage(index)}
                >
                  <FaXmark />
                </button>
              </>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
          <button
            type="reset"
            className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => resetForm()}
          >
            Reset
          </button>
        </div>
        {successMessage && (
          <div className="text-green-500 text-center mt-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-red-500 text-center mt-4">{errorMessage}</div>
        )}
      </form>
    </>
  );
};

export default LeaveRequestForm;
