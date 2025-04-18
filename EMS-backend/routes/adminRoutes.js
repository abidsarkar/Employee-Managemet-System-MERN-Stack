const express = require("express");
const router = express.Router();
const adminController = require("../controller/auth/adminController");
const employeeController = require("../controller/auth/employeeController");
const verifyToken = require("../controller/middleware/auth");
const checkRole = require("../controller/middleware/roleCheck");
const {loginRateLimiter,adminCreationRateLimiter}  = require("../controller/middleware/rateLimiters");

// Auth
router.post("/login",loginRateLimiter, adminController.loginAdmin);
router.post("/create",adminCreationRateLimiter,verifyToken,checkRole("admin"), adminController.createAdmin);
router.get("/logout",adminController.logoutAdmin);
router.get('/adminInfo',verifyToken ,checkRole("admin"), adminController.getAdminInfo);
// Protected Routes
router.get("/getEmployeeList", verifyToken, checkRole("admin"), employeeController.getAllEmployeesList);
router.delete("/DeleteEmployees/:email", verifyToken, checkRole("admin"), employeeController.deleteEmployee);

module.exports = router;
