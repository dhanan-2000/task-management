const express = require("express");
const { authController } = require("../controllers/");
const validate = require("../middleware/validation.middleware");
const { registerSchema, loginSchema } = require("../validation/auth.validation");

const router = express.Router();

router.post("/register",validate(registerSchema), authController.registerUser);
router.post("/login",validate(loginSchema), authController.loginUser);

module.exports = router;
