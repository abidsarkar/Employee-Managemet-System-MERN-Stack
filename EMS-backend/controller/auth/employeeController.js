const Employee = require("../../model/DB/Employees");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");

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
  try {
    const employee = await Employee.findOne({ email });
    if (!employee)
      return res.status(400).json({ message: "Employee not found" });

    const validPass = await bcrypt.compare(password, employee.password);
    if (!validPass)
      return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(employee, "employee", employee.email);
    // ---- Set Cookie Options ----
    const cookieOptions = {
      httpOnly: true, // Prevent JS access
      secure: process.env.NODE_ENV === "production", // ONLY send over HTTPS in production
      sameSite: "Lax", // Or 'Strict' or 'None' (if cross-site and secure:true)
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds (matches JWT expiry)
      // Alternatively, use expires with a Date object
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    };
    // Use a suitable name like 'accessToken' or 'token'
    res.cookie("accessToken", token, cookieOptions);
    res.json({
      message: "Login successful",

      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        profilePicture: employee.profilePicture,
        tasks: employee.tasks,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

exports.getAllEmployeesList = async (req, res) => {
  try {
     // Support both GET (query params) and POST (body)
     const page = req.body.page || req.query.page || 1;
     const limit = req.body.limit || req.query.limit || 10; // Default page is 1, default limit is 10
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    if (
      isNaN(pageNumber) ||
      pageNumber < 1 ||
      isNaN(limitNumber) ||
      limitNumber < 1
    ) {
      return res
        .status(400)
        .json({ message: "Invalid page or limit parameters" });
    }

    const skip = (pageNumber - 1) * limitNumber;

    const employees = await Employee.find().skip(skip).limit(limitNumber);

    const totalEmployees = await Employee.countDocuments();
    const totalPages = Math.ceil(totalEmployees / limitNumber);

    const formattedEmployees = employees.map((employee) => ({
      employeesId: employee._id,
      employeesName: employee.name,
      employeesEmail: employee.email,
      employeesProfilePicture: employee.profilePicture,
      // Add other properties as needed
    }));
    

    res.json({
      message: "Employee list fetched successfully",
      employees: formattedEmployees,
      pagination: {
        currentPage: pageNumber,
        totalPages: totalPages,
        totalItems: totalEmployees,
        limitPerPage: limitNumber,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { email } = req.params;

  try {
    const deleted = await Employee.findOneAndDelete({ email });
    if (!deleted)
      return res.status(404).json({
        success: false,
        message: `Employee with identifier '${email}' not found.`,
      });

    res.status(200).json({
      success: true,
      message: `Employee with identifier '${email}' successfully deleted.`,
      data: deleted, // Optionally include the deleted data for confirmation
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
