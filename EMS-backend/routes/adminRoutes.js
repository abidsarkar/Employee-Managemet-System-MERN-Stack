const express = require("express");
const router = express.Router();
const adminController = require("../controller/auth/adminController");
const employeeController = require("../controller/auth/employeeController");
const verifyToken = require("../controller/middleware/auth");
const checkRole = require("../controller/middleware/roleCheck");
const {loginRateLimiter,adminCreationRateLimiter}  = require("../controller/middleware/rateLimiters");

// Auth
router.get("/login",loginRateLimiter, adminController.loginAdmin);
router.post("/create",adminCreationRateLimiter,verifyToken,checkRole("admin"), adminController.createAdmin);

// Protected Routes
router.get("/employees", verifyToken, checkRole("admin"), employeeController.getAllEmployees);
router.delete("/employees/:email", verifyToken, checkRole("admin"), employeeController.deleteEmployee);

module.exports = router;
