import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { taskRoutes } from "./task.routes";

export const routes = Router();

routes.use(authRoutes);
routes.use(userRoutes);
routes.use(taskRoutes);
