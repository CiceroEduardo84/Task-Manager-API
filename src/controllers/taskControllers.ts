import { Request, Response, NextFunction } from "express";
import { taskSchema } from "../validations/taskSchema";
import { taskServices } from "../services/taskServices";
import { taskRepository } from "../repositories/taskRepository";

export const taskControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const userID = req.userID;
      const task = {
        title,
        description,
        date,
        status,
        idUser: userID,
      };

      const taskCreated = await taskServices.create(task, taskRepository);

      return res.status(201).json({ message: "Task created!", taskCreated });
    } catch (error) {
      return next(error);
    }
  },
};
