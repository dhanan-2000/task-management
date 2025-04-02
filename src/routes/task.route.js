const express = require("express");
const { authenticateJWT } = require("../middleware/auth.middleware");
const { taskController } = require("../controllers");
const validate = require("../middleware/validation.middleware");
const { createTaskSchema,updateTaskSchema } = require("../validation/task.validation");

const router = express.Router();

router.post("/", validate(createTaskSchema),authenticateJWT, taskController.createTask);
router.get("/", authenticateJWT, taskController.getTasks);
router.put("/:id",validate(updateTaskSchema), authenticateJWT, taskController.updateTask);
router.delete("/:id", authenticateJWT, taskController.deleteTask);

module.exports = router;
