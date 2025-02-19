import express from "express";
import {
  CreateTask,
  GetAllTask,
  UpdateTask,
  DeleteTask,
} from "../controllers/task.controller.js";

import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, CreateTask);

router.get("/", verifyToken, GetAllTask);

router.put("/:id", UpdateTask);

router.delete("/:id", DeleteTask);

export default router;
