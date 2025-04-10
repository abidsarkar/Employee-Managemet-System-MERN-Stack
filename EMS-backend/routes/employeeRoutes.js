const express = require("express");
const router = express.Router();
const employeeController = require("../controller/auth/employeeController");
const taskController = require("../controller/task/taskController");
const verifyToken = require("../controller/middleware/auth");
const checkRole = require("../controller/middleware/roleCheck");
const {employeeCreationRateLimiter}  = require("../controller/middleware/rateLimiters");

// Auth
router.get("/login", employeeController.loginEmployee);
router.post("/create",employeeCreationRateLimiter, verifyToken, checkRole("admin"), employeeController.createEmployee);

// Tasks
router.get("/getTask", verifyToken, taskController.getEmployeeTasks);
router.post("/addTask", verifyToken, checkRole("admin"), taskController.addTask);
router.patch("/updateTaskAdmin", verifyToken,checkRole("admin"), taskController.updateTaskByAdmin);
router.patch("/updateTaskEmployee", verifyToken,checkRole("employee"), taskController.updateTaskByEmployee);
router.patch("/submitTask", verifyToken, checkRole("employee"), taskController.submitTask);
router.delete("/deleteTask", verifyToken, checkRole("admin"), taskController.deleteTask);

module.exports = router;
