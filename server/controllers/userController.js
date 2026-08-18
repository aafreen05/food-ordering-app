// controllers/userController.js
import User from "../models/User.js";

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

// @desc    Get a single user by ID (admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching user" });
  }
};

// @desc    Update a user's own profile
// @route   PUT /api/users/:id
// @access  Private (must be the user themself)
export const updateUser = async (req, res) => {
  try {
    // Users can only update their OWN profile — not anyone else's
    if (req.params.id !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this profile" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};