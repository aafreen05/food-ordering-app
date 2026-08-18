// models/User.js
// Defines the shape of a "user" document in MongoDB.

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true, // removes accidental leading/trailing spaces
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // no two users can share an email
      lowercase: true, // always store emails in lowercase to avoid duplicate accounts like "A@x.com" vs "a@x.com"
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      // Note: we store the HASHED password here, never the raw one.
      // Hashing happens in the controller before saving, in Phase 7.
    },
    role: {
      type: String,
      enum: ["user", "admin"], // only these two values are allowed
      default: "user",
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);

export default User;