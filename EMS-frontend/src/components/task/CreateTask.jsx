import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file_source: "",
    category: "",
    task_deadline: "",
    assignedTo: ""
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch employees when component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/getEmployeeList`,
          { withCredentials: true }
        );
        setEmployees(response.data.employees || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employees");
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/employee/addTask`,
        taskData,
        { withCredentials: true }
      );

      if (response.data.message === "Task created") {
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
      } else {
        throw new Error(response.data.message || "Failed to create task");
      }
    } catch (err) {
      console.error("Task creation error:", err);
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
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
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-black"
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
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-black"
          />
        </div>

        <div>
          <label className="block text-white mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-black"
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
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-black"
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
          >
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee._id} value={employee.email}>
                {employee.name} ({employee.email})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating Task..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;