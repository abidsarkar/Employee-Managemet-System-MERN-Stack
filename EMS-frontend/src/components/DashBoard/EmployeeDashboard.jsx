import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../assets/features/auth/authSlice";
import { useNavigate } from "react-router";
import axios from "axios";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the employee data from the Redux state
  const  user  = useSelector((state) => state.auth.user);
  const employeeName = user?.data?.name || "Employee"; // Fallback to "Employee" if name is not available
  const employeeEmail = user?.data?.email || "";

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks for the logged-in employee
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/employees/${employeeEmail}/tasks`);
        setTasks(response.data.tasks);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch tasks.");
        setLoading(false);
      }
    };

    if (employeeEmail) {
      fetchTasks();
    }
  }, [employeeEmail]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/employees/${employeeEmail}/tasks/${taskId}`, {
        status: newStatus,
      });
      // Update the local state to reflect the new status
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
      alert("Task status updated successfully!");
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status.");
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

      {/* Task List */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Your Tasks</h2>
        {loading ? (
          <p className="text-center text-gray-400">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-400">No tasks assigned.</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="p-4 bg-gray-700 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-gray-400 mt-2">{task.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">
                      <span className="font-medium">Deadline:</span>{" "}
                      {new Date(task.task_deadline).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={`${
                          task.status === "pending"
                            ? "text-yellow-500"
                            : task.status === "finished"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {task.status}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {task.status !== "finished" && (
                      <button
                        onClick={() => handleUpdateTaskStatus(task._id, "finished")}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        Mark as Finished
                      </button>
                    )}
                    {task.status !== "failed" && (
                      <button
                        onClick={() => handleUpdateTaskStatus(task._id, "failed")}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Mark as Failed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;