import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

export const taskRoutes = Router();

taskRoutes.use(authMiddleware);

taskRoutes.post("/task", taskControllers.create);
taskRoutes.get("/tasks", taskControllers.read);
taskRoutes.put("/task/:id", taskControllers.update);
taskRoutes.delete("/task/:id", taskControllers.delete);
