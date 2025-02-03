import React from "react";

const CreateTask = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create a New Task
      </h2>
      <form className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              type="text"
              placeholder="Make a UI Design"
            />
          </div>
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              type="date"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {/* Assign To */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assign To
            </label>
            <input
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              type="text"
              placeholder="Employee Name"
            />
          </div>
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              type="text"
              placeholder="Design, Dev, etc."
            />
          </div>
        </div>
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
            rows={4}
            placeholder="Task details..."
          ></textarea>
        </div>
        {/* Button */}
        <button className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
