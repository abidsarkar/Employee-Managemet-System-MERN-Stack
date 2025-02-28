require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const bcrypt = require("bcryptjs");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
  name:String,
});
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
const Admin = mongoose.model("Admin",AdminSchema);

// Read JSON file for admin
fs.readFile("admin.json", "utf8", async (err, data) => {
    if (err) {
      console.error("admin Error reading JSON file:", err);
      mongoose.connection.close();
      return;
    }
  
    try {
      let admins = JSON.parse(data);
  
      // Hash passwords before saving
      for (let admin of admins) {
        admin.password = await bcrypt.hash(admin.password, 10);
      }
    
      // Insert data into MongoDB
      await Admin.insertMany(admins);
      console.log("Admin Data uploaded successfully!");
  
    } catch (error) {
      console.error("admin Error uploading data:", error);
    } finally {
      mongoose.connection.close();
    }
  });
// Read JSON file for employee
fs.readFile("employees.json", "utf8", async (err, data) => {
  if (err) {
    console.error("employee Error reading JSON file:", err);
    mongoose.connection.close();
    return;
  }

  try {
    let employees = JSON.parse(data);

    // Hash passwords before saving
    for (let employee of employees) {
      employee.password = await bcrypt.hash(employee.password, 10);
    }
  
    // Insert data into MongoDB
    await Employee.insertMany(employees);
    console.log("employee Data uploaded successfully!");

  } catch (error) {
    console.error("employee Error uploading data:", error);
  } finally {
    mongoose.connection.close();
  }
});
