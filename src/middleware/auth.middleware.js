const jwt = require("jsonwebtoken");
const structuredResponse = require("../utils/response");

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return structuredResponse(res, 401, false, "No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    return structuredResponse(res, 401, false, "Invalid token", null, err.message);
  }
};

module.exports = { authenticateJWT };
