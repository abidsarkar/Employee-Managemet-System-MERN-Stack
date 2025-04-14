import React from "react";
import { useNavigate } from "react-router";

import EmployeeTaskList from "../list/EmployeeTaskList";
import { useLogoutMutation } from "../../assets/features/otherSlice/authApiSlice";
import { useGetEmployeeInfoQuery } from "../../assets/features/otherSlice/employeeApiSlice";


const EmployeeDashboard = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const { 
    data: employeeInfo, 
    isLoading: isEmployeeLoading, 
    isError: isEmployeeError, 
    error: employeeError 
  } =useGetEmployeeInfoQuery();
  // Access the employee data from the Redux state
 
  

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };
// Display loading or error states if needed
if (isEmployeeLoading) return <div className="min-h-screen bg-gray-900 text-white p-8">Loading Employee information...</div>;
if (isEmployeeError) return <div className="min-h-screen bg-gray-900 text-white p-8">Error loading Employee information: {employeeError?.data?.message || employeeError.message}</div>;
 // Use adminInfo from query instead of Redux store
 const employeeName = employeeInfo?.employee?.name || "Employee";
 const employeeEmail = employeeInfo?.employee?.email;
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium">
          Hello, <span className="text-3xl font-semibold">{employeeName}</span> 👋
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-lg font-medium text-white px-5 py-2 rounded-sm hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Task List</h2>
        <EmployeeTaskList email={employeeEmail} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;