import React from "react";

const TaskListNumber = () => {
  return (
    <div className="flex screen justify-between gap-5 mt-10 text-white">
      <div className="px-9 py-6 rounded-xl  w-[45%] bg-blue-400">
        <h2 className="text-3xl font-semibold">1</h2>
        <h3 className="text-xl font-medium">New Task</h3>
      </div>
      <div className="px-9 py-6 rounded-xl  w-[45%] bg-green-400">
        <h2 className="text-3xl font-semibold">3</h2>
        <h3 className="text-xl font-medium">Completed Task</h3>
      </div>
      <div className="px-9 py-6 rounded-xl  w-[45%] bg-yellow-400">
        <h2 className="text-3xl font-semibold">0</h2>
        <h3 className="text-xl font-medium">Accepted</h3>
      </div>
      <div className="px-9 py-6 rounded-xl  w-[45%] bg-red-400">
        <h2 className="text-3xl font-semibold">0</h2>
        <h3 className="text-xl font-medium">Failed Tasks</h3>
      </div>
    </div>
  );
};

export default TaskListNumber;
