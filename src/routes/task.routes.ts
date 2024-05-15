import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";

export const tasksRoutes = Router();

tasksRoutes.get("/tasks", taskControllers.read);
