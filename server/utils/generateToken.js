// utils/generateToken.js
// Creates a signed JWT token containing a user's ID.

import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },              // payload — data embedded inside the token
    process.env.JWT_SECRET,      // secret key used to sign it (only our server knows this)
    { expiresIn: "30d" }         // token becomes invalid after 30 days
  );
};

export default generateToken;