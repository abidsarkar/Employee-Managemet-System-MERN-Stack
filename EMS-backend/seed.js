import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Schemas
const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  tasks: Array,
});

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Create Models
const Employee = mongoose.model("Employee", EmployeeSchema);
const Admin = mongoose.model("Admin", AdminSchema);

const employees = [
  {
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Design Homepage UI",
        "description": "Create a modern UI for the homepage.",
        "file_source": "https://example.com/design1.jpg",
        "category": "UI/UX",
        "status": "pending",
        "comment_by_employee":null,
        "createdAt": "2025-02-21",
        "task_deadline": "2025-02-28",
        "updatedAt":null,
        "submit_date": null
      }
    ]
  },
  {
    "name": "Bob Smith",
    "email": "bob@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Develop API Endpoints",
        "description": "Create REST API endpoints for the project.",
        "file_source": "https://example.com/api-doc.pdf",
        "category": "Backend",
        "status": "pending",
        "comment_by_employee":null,
        "createdAt": "2025-02-21",
        "task_deadline": "2025-02-28",
        "updatedAt":null,
        "submit_date": null
      }
    ]
  },
  {
    "name": "Charlie Brown",
    "email": "charlie@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Database Schema Design",
        "description": "Design the MongoDB schema for the application.",
        "file_source": "https://example.com/schema.png",
        "created_date": "2025-02-22",
        "task_finished_date": "2025-02-27",
        "category": "Database",
        "status": "pending",
        "submit_date": null
      }
    ]
  },
  {
    "name": "Diana Prince",
    "email": "diana@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Frontend Development",
        "description": "Implement React components for the dashboard.",
        "file_source": "https://example.com/frontend-code.zip",
        "created_date": "2025-02-23",
        "task_finished_date": "2025-03-01",
        "category": "Frontend",
        "status": "pending",
        "submit_date": null
      }
    ]
  },
  {
    "name": "Eve Adams",
    "email": "eve@example.com",
    "password": "123",
    "tasks": [
      {
        "title": "Testing & Debugging",
        "description": "Perform unit and integration testing.",
        "file_source": "https://example.com/test-report.pdf",
        "created_date": "2025-02-24",
        "task_finished_date": "2025-03-02",
        "category": "Testing",
        "status": "pending",
        "submit_date": null
      }
    ]
  }
]


const admin = [
  {
    
    email: "abid@gmail.com",
    password: "123",
  },
];
// Function to Insert Data
const seedDatabase = async () => {
  try {
    await Employee.deleteMany(); // Clear old employees
    await Admin.deleteMany(); // Clear old admins

    await Employee.insertMany(employees); // Insert new employees
    await Admin.insertMany(admin); // Insert new admins

    console.log("✅ Data Inserted Successfully!");
    mongoose.connection.close(); // Close connection
  } catch (error) {
    console.error("❌ Error Inserting Data:", error);
    mongoose.connection.close();
  }
};

// Run Seed Function
seedDatabase();
