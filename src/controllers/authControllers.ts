import { Request, Response, NextFunction, response } from "express";

export const authControllers = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({ message: "User logged in!" });
    } catch (error) {
      return next(error);
    }
  },
};
