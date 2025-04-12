import React from "react";
import { useGetAllEmployeesListQuery, useDeleteEmployeeMutation } from "../../assets/features/otherSlice/adminApiSlice";

const EmployeeList = () => {
  const { 
    data: apiResponse, // Renamed to better reflect the actual structure
    isLoading, 
    isError, 
    error,
    refetch 
  } = useGetAllEmployeesListQuery({ page: 1, limit: 10 });
  
  const [deleteEmployee] = useDeleteEmployeeMutation();

  console.log("Full API Response:", apiResponse); // Debugging log

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId).unwrap();
      refetch();
      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert(error.data?.message || "Failed to delete employee.");
    }
  };

  if (isLoading) return <p className="text-center text-gray-400">Loading employees...</p>;
  if (isError) return <p className="text-center text-red-500">Error: {error?.data?.message || "Failed to load employees"}</p>;
  if (!apiResponse?.employees) return <p className="text-center text-yellow-500">No employees found</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <ul className="space-y-4">
        {apiResponse.employees.map((employee) => (
          <li key={employee.employeesId} className="p-4 border border-gray-300 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-white">{employee.employeesName}</h3>
              <p className="text-gray-400">{employee.employeesEmail}</p>
            </div>
            <button
              onClick={() => handleDelete(employee.employeesId)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {/* You can add pagination controls here using apiResponse.pagination */}
    </div>
  );
};

export default EmployeeList;