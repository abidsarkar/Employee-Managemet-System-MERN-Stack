import React from "react";
import { useNavigate } from "react-router";
import { useLogoutMutation } from "../../assets/features/otherSlice/authApiSlice";
import { useSelector } from "react-redux";
import EmployeeTaskList from "../list/EmployeeTaskList";


const EmployeeDashboard = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  // Access the employee data from the Redux state
  const user = useSelector((state) => state.auth.user);
  const employeeName = user?.data?.name || "Employee";
  const employeeEmail = user?.data?.email || "";

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials()); // <-- Clear Redux state
      navigate("/");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

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