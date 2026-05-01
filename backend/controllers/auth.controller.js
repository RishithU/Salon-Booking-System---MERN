const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/token");


exports.signup = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    // Minimal validation (keep this)
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).send(user);

  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Minimal validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    // 2. Find user (IMPORTANT: include password)
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    // 4. Success response 
    const token = generateToken(user);

    res.status(200).send({
        user: user,
        token: token,
    });

  } catch (error) {
    res.status(500).send(err.message);
  }
};