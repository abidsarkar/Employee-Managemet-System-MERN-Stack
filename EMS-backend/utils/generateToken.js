const jwt = require("jsonwebtoken");

const generateToken = (user, role,email) => {
  return jwt.sign(
    {  id: user._id, role: role, email: email  }, 
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );
};

module.exports = generateToken;
