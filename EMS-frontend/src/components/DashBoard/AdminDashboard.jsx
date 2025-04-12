import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";


import { useLogoutMutation } from "../../assets/features/otherSlice/authApiSlice";
import CreateEmployee from "../task/CreateEmployee";
import CreateTask from "../task/CreateTask";
import EmployeeList from "../list/EmployeeList";
import { useGetAdminInfoQuery } from "../../assets/features/otherSlice/adminApiSlice";

const AdminDashboard = () => {
  const [logout] = useLogoutMutation();
  const { 
    data: adminInfo, 
    isLoading: isAdminLoading, 
    isError: isAdminError, 
    error: adminError 
  } = useGetAdminInfoQuery();
  


  const navigate = useNavigate();

  // Access the admin data from the Redux state
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
 
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials()); // <-- Clear Redux state
      navigate("/");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSelectedEmployee(""); // Reset selectedEmployee
    setTimeout(() => {
      setSelectedEmployee(searchEmail); // Set the new email after a short delay
    }, 1000);
  };
 // Display loading or error states if needed
 if (isAdminLoading) return <div className="min-h-screen bg-gray-900 text-white p-8">Loading admin information...</div>;
 if (isAdminError) return <div className="min-h-screen bg-gray-900 text-white p-8">Error loading admin information: {adminError?.data?.message || adminError.message}</div>;

 // Use adminInfo from query instead of Redux store
 const adminName = adminInfo?.admin?.name || "Admin";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium">
          Hello, <span className="text-3xl font-semibold">{adminName}</span> 👋
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-lg font-medium text-white px-5 py-2 rounded-sm hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Create Employee Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create New Employee</h2>
        <CreateEmployee/>
      </div>

      {/* Employee List Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
        {/* <EmployeeList /> */}

        <EmployeeList/>
      </div>

      {/* Task Management Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Task Management</h2>
        <div className="flex flex-col gap-8">
          {/* Create Task */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Create New Task</h3>
            {/* <CreateTask /> */}
            <CreateTask/>
          </div>

          {/* View Tasks for an Employee */}
          <div>
            <h3 className="text-xl font-semibold mb-4">View Employee Tasks</h3>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Enter employee email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white mb-4"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 text-lg font-medium text-white px-5 py-2 rounded-sm hover:bg-indigo-700 transition"
              >
                Search
              </button>
            </form>
            {selectedEmployee && <TaskList email={selectedEmployee} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;