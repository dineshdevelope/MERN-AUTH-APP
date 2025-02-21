import express from "express";
import {
  createUser,
  deleteProfile,
  getProfile,
  loginUser,
  logoutUser,
  updateProfile,
} from "../controllers/user.controller.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/profile", verifyToken, getProfile);

router.put("/profile", verifyToken, updateProfile);

router.delete("/profile", verifyToken, deleteProfile);

export default router;
