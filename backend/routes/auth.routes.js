const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

// Signup
router.post("/signup", authController.signup);

// Login
router.post("/login", authController.login);

//TEST AUTH MIDDLEWARE - TEMPORARY
const { protect, authorize } = require("../middlewares/auth.middleware");

router.get(
  "/customer-only",
  protect,
  authorize("owner"),
  (req, res) => {
    console.log({
      message: "Welcome Customer",
      user: req.user
    })
    res.send({
      message: "Welcome Customer",
      user: req.user
    });
  }
);

module.exports = router;