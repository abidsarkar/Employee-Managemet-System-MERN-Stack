import React, { useState } from "react";
import { useGetEmployeeTaskQuery } from "../../assets/features/otherSlice/employeeApiSlice";
import {  useDeleteTaskAdminMutation, useUpdateTaskAdminMutation } from "../../assets/features/otherSlice/adminApiSlice";


const TaskList = ({ email }) => {
  const { data: tasksData, isLoading, isError, refetch } = useGetEmployeeTaskQuery(email);
  
  const [updateTask] = useUpdateTaskAdminMutation();
  const [deleteTask] = useDeleteTaskAdminMutation();
  const [editingTask, setEditingTask] = useState("");
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    file_source: "",
    category: "",
    status: "",
    comment_by_employee: "",
    task_deadline: "",
  });

  const handleEdit = (task) => {
    setEditingTask(task._id);
    setEditFormData({
      title: task.title,
      description: task.description,
      file_source: task.file_source,
      category: task.category,
      status: task.status,
      comment_by_employee: task.comment_by_employee,
      task_deadline: task.task_deadline.split("T")[0],
    });
  };

  const handleSaveEdit = async (taskId) => {
    try {
      const updates = {
        email,
        taskId,
        title: editFormData.title,
        description: editFormData.description,
        file_source: editFormData.file_source,
        category: editFormData.category,
        status: editFormData.status,
        comment_by_employee: editFormData.comment_by_employee,
        task_deadline: new Date(editFormData.task_deadline).toISOString(),
      };

      await updateTask(updates).unwrap();
      refetch();
      setEditingTask(null);
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      alert(error.data?.message || "Failed to update task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      
      await deleteTask({ email, taskId }).unwrap();
      refetch();
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert(error.data?.message || "Failed to delete task.");
    }
  };
  if (isLoading) return <p className="text-center text-gray-400">Loading tasks...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load tasks.</p>;


  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <ul className="space-y-4">
        {tasksData?.tasks?.map((task) => (
          <li key={task._id} className="p-4 border border-gray-300 rounded-lg">
            {editingTask === task._id ? (
              <div className="space-y-4">
                 <label className="block text-white mb-1">Task Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
                />
                 <label className="block text-white mb-1">Description</label>

                <textarea
                  placeholder="Description"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
                  rows={4}
                />
                 <label className="block text-white mb-1">Source Link</label>

                <input
                  type="text"
                  placeholder="File Source"
                  value={editFormData.file_source}
                  onChange={(e) => setEditFormData({ ...editFormData, file_source: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
                />
                 <label className="block text-white mb-1">Category</label>

                <input
                  type="text"
                  placeholder="Category"
                  value={editFormData.category}
                  onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
                />
                 <label className="block text-white mb-1">Status</label>

                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-black"
                >
                  <option value="pending">Pending</option>
                  <option value="finished">Finished</option>
                  <option value="failed">Failed</option>
                  <option value="accepted">Accepted</option>
                </select>
                <label className="block text-white mb-1">Update Dead-Line</label>
                
                <input
                  type="date"
                  placeholder="Task Deadline"
                  value={editFormData.task_deadline}
                  onChange={(e) => setEditFormData({ ...editFormData, task_deadline: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 text-white"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(task._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;