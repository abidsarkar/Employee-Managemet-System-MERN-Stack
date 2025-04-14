const Employee = require("../../model/DB/Employees");
const { Types } = require("mongoose");
exports.getEmployeeTasks = async (req, res) => {
  const { email } = req.query; // 👈 use query instead of body

  try {
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ success: true, tasks: employee.tasks || [] });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.addTask = async (req, res) => {
  const { email, title, description, file_source, category, task_deadline } =
    req.body;
  if (!email) {
    return res.status(400).json({ message: "email is require" });
  }
  const employee = await Employee.findOne({ email });

  if (!employee) return res.status(404).json({ message: "Employee not found" });
  if (!title) {
    return res.status(400).json({ message: "title fields are required" });
  }

  const newTask = {
    title,
    description,
    file_source,
    category,
    status: "pending",
    createdAt: new Date(),
    task_deadline,
    updatedAt: null,
    submit_date: null,
    comment_by_employee: null,
  };

  try {
    const employee = await Employee.findOneAndUpdate(
      { email },
      { $push: { tasks: newTask } },
      { new: true }
    );

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    const createdTask = employee.tasks[employee.tasks.length - 1];
    res.status(201).json({ message: "Task created", task: createdTask });
  } catch (error) {
    console.error("Task creation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateTaskByAdmin = async (req, res) => {
  const { email, taskId } = req.body;
  const updates = req.body;

  if (!Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const employee = await Employee.findOneAndUpdate(
      { email, "tasks._id": taskId },
      {
        $set: {
          "tasks.$.title": updates.title,
          "tasks.$.description": updates.description,
          "tasks.$.file_source": updates.file_source,
          "tasks.$.category": updates.category,
          "tasks.$.status": updates.status,
          "tasks.$.task_deadline": updates.task_deadline,
          "tasks.$.updatedAt": new Date(),
          // Note: Admin should not directly modify submit_date or comment_by_employee here.
          // If needed, separate logic can be added.
        },
      },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee or Task not found" });
    }

    const updatedTask = employee.tasks.find((t) => t._id.toString() === taskId);
    res.json({ message: "Task updated by admin", task: updatedTask });
  } catch (error) {
    console.error("Error updating task by admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateTaskByEmployee = async (req, res) => {
  const { email, taskId } = req.body;
  const { status, comment_by_employee } = req.body;

  if (!Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const employee = await Employee.findOneAndUpdate(
      { email, "tasks._id": taskId },
      {
        $set: {
          "tasks.$.status": status,
          "tasks.$.comment_by_employee": comment_by_employee,
          "tasks.$.updatedAt": new Date(),
          ...(status === "finished" && { "tasks.$.submit_date": new Date() }), // Update submit_date if status is finished
        },
      },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee or Task not found" });
    }

    const updatedTask = employee.tasks.find((t) => t._id.toString() === taskId);
    res.json({ message: "Task updated by employee", task: updatedTask });
  } catch (error) {
    console.error("Error updating task by employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.submitTask = async (req, res) => {
  const { email, taskId } = req.body;

  try {
    const employee = await Employee.findOneAndUpdate(
      { email, "tasks._id": taskId },
      {
        $set: {
          "tasks.$.status": "finished",
          "tasks.$.submit_date": new Date(),
          "tasks.$.updatedAt": new Date(),
        },
      },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee or Task not found" });
    }
    res.json({ message: "Task submitted", task: employee.tasks.find(t => t._id.toString() === taskId) });
  } catch (error) {
    console.error("Error submitting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { email, taskId } = req.params;

  try {
    const employee = await Employee.findOneAndUpdate(
      { email },
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee or Task not found" });
    }
    res.json({ message: "Task deleted", employee });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
