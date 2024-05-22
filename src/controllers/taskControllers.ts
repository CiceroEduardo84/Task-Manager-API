import { Request, Response, NextFunction } from "express";
import { taskSchema } from "../validations/taskSchema";

export const taskControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const userID = req.userID;
      const taskCreated = {
        title,
        description,
        date,
        status,
        idUser: userID,
      };

      return res.status(200).json({ message: "Tasks!", taskCreated });
    } catch (error) {
      return next(error);
    }
  },
};
