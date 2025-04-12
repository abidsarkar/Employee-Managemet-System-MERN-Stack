import React, { useState } from "react";
import { 
  useAddTaskMutation,
  useGetAllEmployeesListQuery 
} from "../../assets/features/otherSlice/adminApiSlice";

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file_source: "",
    category: "",
    task_deadline: "",
    assignedTo: ""
  });

  // RTK Query hooks
  const [addTask, { isLoading }] = useAddTaskMutation();
  const { 
    data: employeesData, 
    isLoading: isEmployeesLoading, 
    isError: isEmployeesError 
  } = useGetAllEmployeesListQuery({ page: 1, limit: 100 });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const taskData = {
        email: formData.assignedTo,
        title: formData.title,
        description: formData.description,
        file_source: formData.file_source,
        category: formData.category,
        task_deadline: formData.task_deadline
      };

      const response = await addTask(taskData).unwrap();

      if (response.message === "Task created") {
        alert("Task created successfully!");
        // Reset form
        setFormData({
          title: "",
          description: "",
          file_source: "",
          category: "",
          task_deadline: "",
          assignedTo: ""
        });
      }
    } catch (err) {
      console.error("Task creation error:", err);
      setError(err.data?.message || "Failed to create task");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Create New Task</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-500 text-white rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-1">Task Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-white mb-1">File Source (Optional)</label>
          <input
            type="text"
            name="file_source"
            value={formData.file_source}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
          />
        </div>

        <div>
          <label className="block text-white mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-1">Deadline</label>
          <input
            type="date"
            name="task_deadline"
            value={formData.task_deadline}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-1">Assign To</label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-black"
            required
            disabled={isEmployeesLoading || isEmployeesError}
          >
            <option value="">Select Employee</option>
            {employeesData?.employees?.map(employee => (
              <option key={employee.employeesId} value={employee.employeesEmail}>
                {employee.employeesName} ({employee.employeesEmail})
              </option>
            ))}
          </select>
          {isEmployeesLoading && <p className="text-gray-400 text-sm mt-1">Loading employees...</p>}
          {isEmployeesError && <p className="text-red-400 text-sm mt-1">Error loading employees</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Creating Task..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;