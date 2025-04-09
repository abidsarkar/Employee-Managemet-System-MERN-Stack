const express = require("express");
const router = express.Router();
const adminController = require("../controller/auth/adminController");
const verifyToken = require("../controller/middleware/auth");
const checkRole = require("../controller/middleware/roleCheck");

// Auth
router.post("/login", adminController.loginAdmin);
router.post("/create", adminController.createAdmin);

// Protected Routes
router.get("/employees", verifyToken, checkRole("admin"), employeeController.getAllEmployees);
router.delete("/employees/:email", verifyToken, checkRole("admin"), employeeController.deleteEmployee);

module.exports = router;
