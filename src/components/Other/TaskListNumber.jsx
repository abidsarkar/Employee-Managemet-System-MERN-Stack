import React from "react";

const TaskListNumber = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-white">
      <div className="px-8 py-6 rounded-xl bg-blue-500 shadow-md text-center">
        <h2 className="text-4xl font-bold">1</h2>
        <h3 className="text-lg font-medium">New Task</h3>
      </div>
      <div className="px-8 py-6 rounded-xl bg-green-500 shadow-md text-center">
        <h2 className="text-4xl font-bold">3</h2>
        <h3 className="text-lg font-medium">Completed Tasks</h3>
      </div>
      <div className="px-8 py-6 rounded-xl bg-yellow-500 shadow-md text-center">
        <h2 className="text-4xl font-bold">0</h2>
        <h3 className="text-lg font-medium">Accepted</h3>
      </div>
      <div className="px-8 py-6 rounded-xl bg-red-500 shadow-md text-center">
        <h2 className="text-4xl font-bold">0</h2>
        <h3 className="text-lg font-medium">Failed Tasks</h3>
      </div>
    </div>
  );
};

export default TaskListNumber;
