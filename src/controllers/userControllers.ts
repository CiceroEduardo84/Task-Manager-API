import { Request, Response, NextFunction } from "express";
import { userSchema } from "../validations/userSchema";
import { userServices } from "../services/userServices";
import { userRepository } from "../repositories/userRepository";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = userSchema.parse(req.body);

      // Services
      const userCreated = await userServices.create(
        { name, email, password },
        userRepository
      );

      return res.status(201).json({ message: "User created!", userCreated });
    } catch (error) {
      return next(error);
    }
  },
};
