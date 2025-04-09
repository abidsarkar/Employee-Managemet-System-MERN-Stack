const Admin = require("../../model/DB/AdminsDb");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
// Admin signup
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Admin already exists" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashedPassword });

    const token = generateToken(admin, "admin");

    res.status(201).json({
      message: "Admin created successfully",
      token,
    });
  } catch (err) {
    console.error("Admin creation error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ message: "Admin not found" });

  const validPass = await bcrypt.compare(password, admin.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

  const token = generateToken(admin, "admin");

  res.json({
    message: "Login successful",
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email, profilePicture: admin.profilePicture },
  });
};
