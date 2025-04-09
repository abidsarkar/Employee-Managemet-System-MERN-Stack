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
    await Admin.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (err) {
    console.error("Admin creation error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const validPass = await bcrypt.compare(password, admin.password);
    if (!validPass) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ---- Generate Token ----
    const token = generateToken(admin, "admin", admin.email);

    // ---- Set Cookie Options ----
    const cookieOptions = {
      httpOnly: true, // Prevent JS access
      secure: process.env.NODE_ENV === 'production', // ONLY send over HTTPS in production
      sameSite: 'Lax', // Or 'Strict' or 'None' (if cross-site and secure:true)
       maxAge: 10 * 24 * 60 * 60 * 1000 ,// 10 days in milliseconds (matches JWT expiry)
      // Alternatively, use expires with a Date object
       expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days from now
    };



    // ---- Set Cookie ----
    // Use a suitable name like 'accessToken' or 'token'
    res.cookie('accessToken', token, cookieOptions);

    // ---- Send Success Response (WITHOUT the token in the body) ----
    res.status(200).json({
      message: "Login successful",
      // Token is now in the HttpOnly cookie, not here
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        profilePicture: admin.profilePicture,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
