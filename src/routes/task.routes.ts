import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";
import { authMiddleware } from "../middleware/authMiddleware";

export const tasksRoutes = Router();

tasksRoutes.post("/task", authMiddleware, taskControllers.create);
