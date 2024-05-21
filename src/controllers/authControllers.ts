import { Request, Response, NextFunction, response } from "express";
import { loginSchema } from "../validations/loginSchema";
import { authServices } from "../services/authServices";
import { userRepository } from "../repositories/userRepository";

export const authControllers = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const token = await authServices.login({email, password}, userRepository)
      return res.status(200).json({ message: "User logged in!" });
    } catch (error) {
      return next(error);
    }
  },
};
