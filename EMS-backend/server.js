const express = require("express");

const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(cookieParser()); // Enable Cookie Parsing
app.use(express.json());
app.use(cors());
//db connection
const connectDB = require("./model/config/dbConfig");
connectDB();
//routes
const adminRoutes = require("./routes/adminRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/v2/admin", adminRoutes);
app.use("/api/v2/employee", employeeRoutes);
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));