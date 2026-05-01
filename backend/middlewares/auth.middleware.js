const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    let token;

    // 1. Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. If no token
    if (!token) {
      return res.status(401).send({
        message: "Not authorized, token missing"
      });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user info to request
    req.user = decoded;
    console.log('Protected Authenticated')
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Not authorized, invalid token"
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    // roles = ["owner"] or ["customer"] or ["owner", "customer"]

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions"
      });
    }
    //console.log(req.user)
    console.log("Authorized as ",req.user.role)
    next();
  };
};