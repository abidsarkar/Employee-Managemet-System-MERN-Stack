import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeTaskList = ({ email }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState(""); // For adding comments
  const [taskToComment, setTaskToComment] = useState(null); // Track the task for adding a comment

  // Fetch tasks for the specified employee
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/employees/${email}/tasks`
        );
        setTasks(response.data.tasks);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch tasks.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, [email]);

  const handleUpdateStatus = async (taskId, status) => {
    try {
      // Find the existing task
      const existingTask = tasks.find((task) => task._id === taskId);
      if (!existingTask) return alert("Task not found");

      // Prepare updated task with all previous data
      const updatedTask = {
        ...existingTask, // Preserve all task fields
        status,
        updatedAt: new Date().toISOString(), // Update timestamp
        submit_date:
          status === "finished"
            ? new Date().toISOString()
            : existingTask.submit_date, // Preserve previous date
      };

      // Send updated task to the backend
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/employees/${email}/tasks/${taskId}`,
        updatedTask
      );

      // Update local state
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );

      alert(`Task status updated to ${status} successfully!`);
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status.");
    }
  };

  const handleAddComment = async (taskId) => {
    try {
      // Find the existing task
      const existingTask = tasks.find((task) => task._id === taskId);
      if (!existingTask) return alert("Task not found");

      // Preserve all task fields and add a comment
      const updatedTask = {
        ...existingTask, // Keep all existing data
        comment_by_employee: comment,
        updatedAt: new Date().toISOString(),
      };

      // Send updated task to the backend
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/employees/${email}/tasks/${taskId}`,
        updatedTask
      );

      // Update local state
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );

      setComment("");
      setTaskToComment(null);
      alert("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment.");
    }
  };

  // Calculate remaining time from deadline
  const calculateRemainingTime = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate - now;

    if (diff <= 0) return "Deadline passed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m remaining`;
  };

  // Get border color based on status
  const getBorderColor = (status) => {
    switch (status) {
      case "pending":
        return "border-yellow-500";
      case "finished":
        return "border-green-500";
      case "failed":
        return "border-red-500";
      case "accepted":
        return "border-blue-500";
      default:
        return "border-gray-300";
    }
  };

  if (loading)
    return <p className="text-center text-gray-400">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`p-4 border-2 rounded-lg ${getBorderColor(task.status)}`}
          >
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-gray-400 mt-2">{task.description}</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-400">
                <span className="font-medium">File Source:</span>{" "}
                <a
                  href={task.file_source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {task.file_source}
                </a>
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium">Category:</span> {task.category}
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`${
                    task.status === "pending"
                      ? "text-yellow-500"
                      : task.status === "finished"
                      ? "text-green-500"
                      : task.status === "failed"
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {task.status}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium">Comment by Employee:</span>{" "}
                {task.comment_by_employee || "No comment"}
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium">Created At:</span>{" "}
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium">Task Deadline:</span>{" "}
                {new Date(task.task_deadline).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium">Remaining Time:</span>{" "}
                {calculateRemainingTime(task.task_deadline)}
              </p>
              {task.submit_date && (
                <p className="text-sm text-gray-400">
                  <span className="font-medium">Submitted On:</span>{" "}
                  {new Date(task.submit_date).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleUpdateStatus(task._id, "finished")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Submit Work
              </button>
              <button
                onClick={() => handleUpdateStatus(task._id, "accepted")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Accept
              </button>
              <button
                onClick={() => handleUpdateStatus(task._id, "failed")}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Failed
              </button>
              <button
                onClick={() => setTaskToComment(task._id)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Add Comment
              </button>
            </div>
            {taskToComment === task._id && (
              <div className="mt-4">
                <textarea
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-black"
                  rows={3}
                />
                <button
                  onClick={() => handleAddComment(task._id)}
                  className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                  Save Comment
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeTaskList;
