// controllers/authController.js
// Handles registration, login, and fetching the current logged-in user.

import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email, and password" });
    }

    // 2. Check if a user with this email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    // 3. Hash the password before saving — NEVER store plain text
    const salt = await bcrypt.genSalt(10); // "10 rounds" is a good balance of security vs speed
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the user in MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Generate a token so the user is immediately logged in after signup
    const token = generateToken(user._id);

    // 6. Send back user info (never send the password back!) + token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration" });
  }
};

// @desc    Log in an existing user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // 1. Find the user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare the submitted password against the stored hash
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Generate a token
    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
};

// @desc    Get the currently logged-in user's profile
// @route   GET /api/auth/me
// @access  Private (requires token)
export const getMe = async (req, res) => {
  // req.user will be set by our auth middleware (created next)
  res.json(req.user);
};