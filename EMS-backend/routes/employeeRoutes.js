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
router.put("/:email/tasks/:taskId", verifyToken, taskController.updateTask);
router.put("/:email/tasks/:taskId/submit", verifyToken, checkRole("employee"), taskController.submitTask);
router.delete("/:email/tasks/:taskId", verifyToken, checkRole("admin"), taskController.deleteTask);

module.exports = router;
