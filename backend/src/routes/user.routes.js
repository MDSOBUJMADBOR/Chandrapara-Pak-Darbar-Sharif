import express from "express";
import {
  getAllUsers,
  updateUserRole,
  updateUserProfile,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.put("/:id", updateUserProfile);
router.patch("/:id", updateUserProfile);
router.patch("/:id/role", updateUserRole);
router.delete("/:id", deleteUser);

export default router;

