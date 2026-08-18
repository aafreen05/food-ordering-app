// routes/userRoutes.js
import express from "express";
import { getAllUsers, getUserById, updateUser } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, getAllUsers);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, updateUser); // any logged-in user can call this, but only for their own ID (checked in controller)

export default router;