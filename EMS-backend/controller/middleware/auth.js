const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  let token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ msg: "Access Denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
