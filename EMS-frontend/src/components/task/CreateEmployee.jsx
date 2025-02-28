import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEmployee } from "../../assets/features/employees/employeeSlice";

const CreateEmployee = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createEmployee(formData)).unwrap();
      alert("Employee created successfully!");
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("Failed to create employee.");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Employee Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
          required
        />
        <input
          type="email"
          placeholder="Employee Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
          required
        />
        <input
          type="password"
          placeholder="Employee Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;