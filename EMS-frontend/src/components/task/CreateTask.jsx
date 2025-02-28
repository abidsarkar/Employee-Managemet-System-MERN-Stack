import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../assets/features/tasks/taskSlice";
import axios from "axios";

const CreateTask = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file_source: "",
    category: "",
    task_deadline: "",
    assignedTo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const taskData = {
        title: formData.title,
        description: formData.description,
        file_source: formData.file_source,
        category: formData.category,
        task_deadline: formData.task_deadline,
      };

      const response = await axios.post(
        `http://localhost:5000/employees/${formData.assignedTo}/tasks`,
        taskData
      );

      console.log("Backend response:", response.data); // Log the backend response

      if (response.data.message === "Task created successfully") {
        alert("Task created successfully!");
        setFormData({
          title: "",
          description: "",
          file_source: "",
          category: "",
          task_deadline: "",
          assignedTo: "",
        });
      } else {
        alert("Failed to create task.");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      if (error.response) {
        console.error("Backend error response:", error.response.data); // Log backend error response
      }
      alert("Failed to create task.");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
          required
        />
        <textarea
          placeholder="Task Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
          rows={4}
          required
        />
        <input
          type="text"
          placeholder="File Source (Optional)"
          value={formData.file_source}
          onChange={(e) => setFormData({ ...formData, file_source: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
          required
        />
        <p className="text-white">Task Deadline</p>
        <input
          type="date"
          placeholder="Task Deadline"
          value={formData.task_deadline}
          onChange={(e) => setFormData({ ...formData, task_deadline: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
          required
        />
        <select
          value={formData.assignedTo}
          onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-black"
          required
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee.email}>
              {employee.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;