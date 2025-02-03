import React from "react";
import Header from "../Other/Header";

const AdminDashboard = () => {
  return (
    <div className="h-screen w-full p-10 text-white">
      <Header />
      <div>
        <form>
          <div>
            {/* task title */}
            <h3>Task title</h3>
            <input
              className="placeholder:text-gray-400 bg-white text-black"
              type="text"
              placeholder="Make a Ui Design"
            />
          </div>
          {/* task description */}
          <div>
            <h3>Description</h3>
            <textarea
              className="outline-none bg-white text-black"
              name=""
              id=""
              cols={30}
              rows={10}
            ></textarea>
          </div>
          {/* date */}
          <div>
            <h3>Date</h3>
            <input className="outline-none bg-white text-black" type="date" />
          </div>
          {/* assign to whom */}
          <div>
            <h3>Assign to</h3>
            <input
              className="outline-none bg-white text-black"
              type="text"
              placeholder="employee name"
            />
          </div>
          {/* category of task */}
          <div>
            <h3>Category</h3>
            <input
              className="outline-none bg-white text-black"
              type="text"
              placeholder="design, dev, etc"
            />
          </div>
          {/* button */}
          <button>Create Task</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
