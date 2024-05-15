import { Request, Response, NextFunction } from "express";

export const taskControllers = {
  async read(_req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({ message: "Tasks!" });
    } catch (error) {
      return next(error);
    }
  },
};
