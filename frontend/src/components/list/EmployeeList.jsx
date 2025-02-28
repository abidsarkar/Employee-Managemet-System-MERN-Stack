import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../../assets/features/employees/employeeSlice";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = async (email) => {
    try {
      await dispatch(deleteEmployee(email)).unwrap();
      alert("Employee deleted successfully!");
      dispatch(fetchEmployees()); // Refetch employees after deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading employees...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <ul className="space-y-4">
        {employees.map((employee) => (
          <li key={employee._id} className="flex justify-between items-center p-4 border border-gray-300 rounded-lg">
            <div>
              <h3 className="text-lg font-semibold">{employee.name}</h3>
              <p className="text-gray-400">{employee.email}</p>
            </div>
            <button
              onClick={() => handleDelete(employee.email)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;