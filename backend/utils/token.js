const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  console.log('Generation of token ....')
  return jwt.sign(
    {
      userId: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d"
    }
  );
};

module.exports = generateToken;