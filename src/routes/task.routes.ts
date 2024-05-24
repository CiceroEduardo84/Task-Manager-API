import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";
import { authMiddleware } from "../middleware/authMiddleware";

export const tasksRoutes = Router();

tasksRoutes.use(authMiddleware);

tasksRoutes.post("/task", taskControllers.create);
tasksRoutes.get("/tasks", taskControllers.read);
tasksRoutes.put("/task/:taskId", taskControllers.update);
tasksRoutes.delete("/task/:taskId", taskControllers.delete);
