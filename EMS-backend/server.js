require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Admin Schema & Model
const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
  name:String,
});
const Admin = mongoose.model("Admin", AdminSchema);

// Employee Schema & Model
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  file_source: String,
  category: String,
  status: { type: String, enum: ["pending", "finished", "failed","accepted"], default: "pending" },
  comment_by_employee: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  task_deadline: Date,
  updatedAt: { type: Date, default: null },
  submit_date: { type: Date, default: null },
});

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  tasks: [TaskSchema],
});

const Employee = mongoose.model("Employee", EmployeeSchema);

// Admin Login (Plain, No JWT)
app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ message: "Admin not found" });

  const validPass = await bcrypt.compare(password, admin.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

  // Return admin data
  res.json({
    message: "Login successful",
    admin: {
      id: admin._id,
      email: admin.email,
      name:admin.name,
    },
  });
});
// Employee Login
app.post("/employee/login", async (req, res) => {
  const { email, password } = req.body;
  const employee = await Employee.findOne({ email });
  if (!employee) return res.status(400).json({ message: "Employee not found" });

  const validPass = await bcrypt.compare(password, employee.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

  // Return employee data
  res.json({
    message: "Login successful",
    employee: {
      id: employee._id,
      name: employee.name,
      email: employee.email,
      tasks: employee.tasks,
    },
  });
});
// Get all employees
app.get("/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Create a new employee
app.post("/employees", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newEmployee = new Employee({ name, email, password: hashedPassword, tasks: [] });
  await newEmployee.save();
  res.json(newEmployee);
});
//show task
app.get("/employees/:email/tasks", async (req, res) => {
  try {
    const { email } = req.params;
    const employee = await Employee.findOne({ email: email });

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    if (!employee.tasks) {
      return res.status(200).json({ success: true, tasks: [] }); // Employee exists but has no tasks
    }

    res.status(200).json({ success: true, tasks: employee.tasks });

  } catch (error) {
    console.error("Error fetching employee tasks:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// Add a task to an employee
app.post("/employees/:email/tasks", async (req, res) => {
  const { email } = req.params;
  const { title, description, file_source, category, task_deadline } = req.body;

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

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Return the newly created task
    const createdTask = employee.tasks[employee.tasks.length - 1];
    res.status(201).json({ message: "Task created successfully", task: createdTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const { Types } = require("mongoose"); // Import Types for ObjectId validation

// Update a task
app.put("/employees/:email/tasks/:taskId", async (req, res) => {
  const { email, taskId } = req.params;
  const updates = req.body;

  // Validate taskId as a valid MongoDB ObjectId
  if (!Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const employee = await Employee.findOneAndUpdate(
      { email, "tasks._id": taskId },
      {
        $set: {
          "tasks.$": { ...updates, updatedAt: new Date() }, // Update the task with new data
        },
      },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee or Task not found" });
    }

    // Return the updated task instead of the entire employee object
    const updatedTask = employee.tasks.find((task) => task._id.toString() === taskId);
    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Submit a task
app.put("/employees/:email/tasks/:taskId/submit", async (req, res) => {
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

  if (!employee) return res.status(404).json({ message: "Employee or Task not found" });
  res.json(employee);
});

// Delete a task
app.delete("/employees/:email/tasks/:taskId", async (req, res) => {
  const { email, taskId } = req.params;

  const employee = await Employee.findOneAndUpdate(
    { email },
    { $pull: { tasks: { _id: taskId } } },
    { new: true }
  );

  if (!employee) return res.status(404).json({ message: "Employee or Task not found" });
  res.json(employee);
});

// Delete an employee
app.delete("/employees/:email", async (req, res) => {
  const { email } = req.params; // Extract email from request parameters

  try {
    const deletedEmployee = await Employee.findOneAndDelete({ email });
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully", deletedEmployee });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const corsOptions = {
  origin: "http://localhost:5173", // Your React app URL
  credentials: true,
};
app.use(cors(corsOptions));

