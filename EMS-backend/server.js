import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost/EMSDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected to EMSDB"))
  .catch((err) => console.log(err));

// Define models
const EmployeeSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  tasks: Array,
});
const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const Employee = mongoose.model("Employee", EmployeeSchema);
const Admin = mongoose.model("Admin", AdminSchema);

// API Routes
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email, password });
  if (admin) return res.json({ role: "admin" });

  const employee = await Employee.findOne({ email, password });
  if (employee) return res.json({ role: "employee", employee });

  res.status(401).json({ error: "Invalid credentials" });
});

app.get("/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.listen(5000, () => console.log("Server running on port 5000"));
