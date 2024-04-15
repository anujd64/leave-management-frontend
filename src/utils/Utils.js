export function setLocalStorageItems (loginData,deptName) {
    localStorage.setItem("token", loginData.jwtToken.toString());
      localStorage.setItem("employeeId", loginData.userDetails.employeeId);
      localStorage.setItem("username", loginData.userDetails.username);
      localStorage.setItem("email", loginData.userDetails.email);
      localStorage.setItem("isManager", loginData.userDetails.isManager.toString());
      localStorage.setItem("departmentId", loginData.userDetails.departmentId.toString());
      localStorage.setItem("profileData", JSON.stringify(loginData.userDetails));
      localStorage.setItem("departmentName", deptName);
      return true;
  };