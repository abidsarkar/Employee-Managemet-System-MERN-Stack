const Employee = require("../../model/DB/Employees");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.createEmployee = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await Employee.findOne({ email });
  if (existing)
    return res.status(400).json({ message: "Employee already exists" });
  if (password.length < 6)
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const employee = await Employee.create({
    name,
    email,
    password: hashedPassword,
    tasks: [],
  });

  res.status(201).json({ message: "Employee created", employee });
};

exports.loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  const employee = await Employee.findOne({ email });
  if (!employee) return res.status(400).json({ message: "Employee not found" });

  const validPass = await bcrypt.compare(password, employee.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

  const token = generateToken(employee, "employee");

  res.json({
    message: "Login successful",
    token,
    employee: {
      id: employee._id,
      name: employee.name,
      email: employee.email,
      profilePicture:employee.profilePicture,
      tasks: employee.tasks,
    },
  });
};

exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

exports.deleteEmployee = async (req, res) => {
  const { email } = req.params;

  try {
    const deleted = await Employee.findOneAndDelete({ email });
    if (!deleted)
      return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee deleted successfully", deleted });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
