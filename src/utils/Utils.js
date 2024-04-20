import dayjs from "dayjs";

export function setLocalStorageItems(loginData, deptName) {
  if (loginData.jwtToken)
    localStorage.setItem("token", loginData.jwtToken.toString());
  localStorage.setItem("employeeId", loginData.userDetails.employeeId);
  localStorage.setItem("username", loginData.userDetails.username);
  localStorage.setItem("email", loginData.userDetails.email);
  localStorage.setItem("isManager", loginData.userDetails.isManager.toString());
  localStorage.setItem(
    "departmentId",
    loginData.userDetails.departmentId.toString()
  );
  localStorage.setItem("profileData", JSON.stringify(loginData.userDetails));
  if (deptName) localStorage.setItem("departmentName", deptName);
  return true;
}

export function validateDates(
  leaveRequest,
  leaveTypes,
  images,
  setErrorMessage,
  holidays
) {
  const { startDate, endDate } = leaveRequest;

  const profile = JSON.parse(localStorage.getItem("profileData"));

  // Ensure start date and end date are not empty
  if (!startDate || !endDate) {
    setErrorMessage("Start date and end date are required");
    return false;
  }

  const today = dayjs();

  // Convert start and end dates to Day.js objects
  const startDateObj = dayjs(startDate);
  const endDateObj = dayjs(endDate);
  const isStartLessThanToday = startDateObj.isBefore(today, "day");
  const isEndLessThanToday = endDateObj.isBefore(today, "day");

  // Check if start date or end date is less than today
  if (isStartLessThanToday || isEndLessThanToday) {
    setErrorMessage(
      `${
        isStartLessThanToday ? "start date" : "end date"
      } cannot be less than today`
    );
    return false;
  }

  // Check if start date is after end date
  if (startDateObj.isAfter(endDateObj, "day")) {
    setErrorMessage("Start date cannot be after end date");
    return false;
  }

  // Check if the difference between start and end dates is more than 7 days
  const differenceInDays = endDateObj.diff(startDateObj, "day");
  if (differenceInDays > 7) {
    setErrorMessage("Maximum leave duration is 7 days");
    return false;
  } else if (differenceInDays < 1) {
    setErrorMessage("Minimum leave duration is 1 day");
    return false;
  }

  // Check if start date or end date is weekend
  const isStartDateWeekend = [0, 6].includes(startDateObj.day());
  const isEndDateWeekend = [0, 6].includes(endDateObj.day());
  if (isStartDateWeekend || isEndDateWeekend) {
    setErrorMessage(
      `Leave cannot be applied for weekends, ${
        isEndDateWeekend ? "end date" : "start date"
      } is a weekend`
    );
    return false;
  }

  const isStartDateHoliday = holidays.includes(startDate);
  const isEndDateHoliday = holidays.includes(endDate);

  if (isStartDateHoliday || isEndDateHoliday) {
    setErrorMessage(
      `Leave cannot be applied for on holidays, ${
        isEndDateHoliday ? "end date" : "start date"
      } is a holiday`
    );
    return false;
  }

  if (leaveRequest.leaveTypeId === "") {
    setErrorMessage("Select a Leave Type!");
    return false;
  }

  const leaveType = leaveTypes.find(
    (type) => type.leaveTypeId === leaveRequest.leaveTypeId
  );

  if (leaveType.leaveTypeName === "Maternity Leave") {
    if (profile.gender === "male") {
      setErrorMessage("Maternity leave is only for Female Profiles");
      return false;
    }
  } else if (leaveType.leaveTypeName === "Paternity Leave") {
    if (profile.gender === "female") {
      setErrorMessage("Paternity leave is only for Male Profiles");
      return false;
    }
  }
  if (leaveType.docsRequired === true) {
    if (images === 0) {
      setErrorMessage("Please attach the required documents!");
      return false;
    }
  }

  console.log("Leave Request Data: ", leaveRequest);

  return true;
}

// Function to fetch data from an API endpoint
export const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error(error);
    return []; // Handle empty data on error
  }
};

// Debounce function
export const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
