const Employee = require("../../model/DB/Employees");
const { Types } = require("mongoose");
exports.getEmployeeTasks = async (req, res) => {
  const { email } = req.body;
  const employee = await Employee.findOne({ email });

  if (!employee) return res.status(404).json({ message: "Employee not found" });

  res.status(200).json({ success: true, tasks: employee.tasks || [] });
};

exports.addTask = async (req, res) => {
  const { email, title, description, file_source, category, task_deadline } =
    req.body;
  if (!email) {
    return res.status(400).json({ message: "email is require" });
  }
  const employee = await Employee.findOne({ email });

  if (!employee) return res.status(404).json({ message: "Employee not found" });
  if (!title || !description || !file_source || !category || !task_deadline) {
    return res.status(400).json({ message: "All fields are required" });
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

exports.updateTask = async (req, res) => {
  const { email, taskId } = req.params;
  const updates = req.body;

  if (!Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const employee = await Employee.findOneAndUpdate(
      { email, "tasks._id": taskId },
      { $set: { "tasks.$": { ...updates, updatedAt: new Date() } } },
      { new: true }
    );

    if (!employee)
      return res.status(404).json({ message: "Employee or Task not found" });

    const updatedTask = employee.tasks.find((t) => t._id.toString() === taskId);
    res.json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.submitTask = async (req, res) => {
  const { email, taskId } = req.params;

  const employee = await Employee.findOneAndUpdate(
    { email, "tasks._id": taskId },
    {
      $set: {
        "tasks.$.status": "finished",
        "tasks.$.submit_date": new Date(),
      },
    },
    { new: true }
  );

  if (!employee)
    return res.status(404).json({ message: "Employee or Task not found" });
  res.json(employee);
};

exports.deleteTask = async (req, res) => {
  const { email, taskId } = req.params;

  const employee = await Employee.findOneAndUpdate(
    { email },
    { $pull: { tasks: { _id: taskId } } },
    { new: true }
  );

  if (!employee)
    return res.status(404).json({ message: "Employee or Task not found" });
  res.json(employee);
};
