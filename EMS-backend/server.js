const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

// ----> Create the Express app instance FIRST <----
const app = express();
// ✅ Trust the first proxy (like Render, Vercel, etc.)
app.set("trust proxy", 1);
// --- Now you can use app ---
app.use(cookieParser()); // Enable Cookie Parsing
app.use(express.json()); // Middleware to parse JSON bodies
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true); // allow all origins
    },
    credentials: true,
  })
); // Enable Cross-Origin Resource Sharing

//db connection
const connectDB = require("./model/config/dbConfig");
connectDB(); // Consider adding error handling here (e.g., .catch())

//routes
const adminRoutes = require("./routes/adminRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/v2/admin", adminRoutes);
app.use("/api/v2/employee", employeeRoutes);

// Define PORT
const PORT = process.env.PORT || 10000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
