import { Request, Response, NextFunction } from "express";
import { taskSchema } from "../validations/taskSchema";
import { taskServices } from "../services/taskServices";
import { taskRepository } from "../repositories/taskRepository";
import { paginationSchema } from "../validations/paginationSchema";

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

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.userID;
      const { limite, offset, filter } = paginationSchema.parse(req.query);

      const userTasks = await taskServices.read(
        {
          userID,
          limite,
          offset,
          filter,
        },
        taskRepository
      );

      return res.status(200).json({ message: "Task updated!", userTasks });
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const userID = req.userID;
      const { taskId } = req.params;
      const task = {
        title,
        description,
        date,
        status,
        idUser: userID,
      };

      const taskUpdate = await taskServices.update(
        taskId,
        task,
        taskRepository
      );

      return res.status(200).json({ message: "Task updated!", taskUpdate });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.userID;
      const { taskId } = req.params;

      const taskDeleted = await taskServices.delete(
        taskId,
        userID,
        taskRepository
      );

      return res.status(200).json({ message: "Task updated!", taskDeleted });
    } catch (error) {
      return next(error);
    }
  },
};
