import React from "react";
import Header from "../Other/Header";
import TaskListNumber from "../Other/TaskListNumber";
import TaskList from "../TaskList/TaskList";

const EmployeeDashboard = (props) => {
console.log(props.data.name);
  return (
    <div className="p-10 bg-[#1C1C1C] h-screen">
      <h1 className="bg-red-500 text-white" > my id is {props.data.name} </h1>
      <Header />
      <TaskListNumber/>
      <TaskList/>
    </div>
  );
};

export default EmployeeDashboard;
