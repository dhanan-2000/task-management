const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const structuredResponse = require("../utils/response");


const registerUser = async (req, res) => {
    console.log("JWT_SECRET on register:", process.env.JWT_SECRET);
  try {
    const { username, email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (user) return structuredResponse(res, 400, false, "User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
 
    user = new UserModel({ username, email, password: hashedPassword });
    await user.save();

    return structuredResponse(res, 201, true, "User registered successfully", {
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    return structuredResponse(res, 500, false, "Internal Server Error", null, error.message);
  }
};


const loginUser = async (req, res) => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
  try {
    const { email, password } = req.body;

  
    const user = await UserModel.findOne({ email });
    console.log("user", user);
    if (!user) return structuredResponse(res, 400, false, "Invalid credentials");

    console.log("password", password , user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch", isMatch);
    if (!isMatch) return structuredResponse(res, 400, false, "Invalid credentials");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return structuredResponse(res, 200, true, "Login successful", {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return structuredResponse(res, 500, false, "Internal Server Error", null, error.message);
  }
};

module.exports = { registerUser, loginUser };
