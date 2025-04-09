const express = require("express");
const router = express.Router();
const employeeController = require("../controller/auth/employeeController");
const taskController = require("../controller/task/taskController");
const verifyToken = require("../controller/middleware/auth");
const checkRole = require("../controller/middleware/roleCheck");

// Auth
router.post("/login", employeeController.loginEmployee);
router.post("/create", verifyToken, checkRole("admin"), employeeController.createEmployee);

// Tasks
router.get("/:email/tasks", verifyToken, checkRole("employee"), taskController.getEmployeeTasks);
router.post("/:email/tasks", verifyToken, checkRole("admin"), taskController.addTask);
router.put("/:email/tasks/:taskId", verifyToken, checkRole("admin"), taskController.updateTask);
router.put("/:email/tasks/:taskId/submit", verifyToken, checkRole("employee"), taskController.submitTask);
router.delete("/:email/tasks/:taskId", verifyToken, checkRole("admin"), taskController.deleteTask);

module.exports = router;
