const express = require("express");
const { authenticateJWT } = require("../middleware/auth.middleware");
const { taskController } = require("../controllers");

const router = express.Router();

router.post("/", authenticateJWT, taskController.createTask);
router.get("/", authenticateJWT, taskController.getTasks);
router.put("/:id", authenticateJWT, taskController.updateTask);
router.delete("/:id", authenticateJWT, taskController.deleteTask);

module.exports = router;
