// middleware/authMiddleware.js
// Verifies a JWT token and attaches the corresponding user to req.user.

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Tokens are sent in the header like: "Authorization: Bearer xxxxx.yyyyy.zzzzz"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract just the token part (after "Bearer ")
      token = req.headers.authorization.split(" ")[1];

      // Verify the token's signature and decode its payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database (excluding the password field)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next(); // move on to the actual route handler
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// Only allows the request through if the logged-in user has role "admin"
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
};