import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/userRepository";
import { loginSchema } from "../validations/loginSchema";
import { authServices } from "../services/authServices";

export const authControllers = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const { token, id } = await authServices.login({ email, password }, userRepository);

      res.cookie(process.env.KEY_TOKEN, token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 18, // 18h
      });

      return res.status(200).json({ message: "login completed successfully!", id });
    } catch (error) {
      return next(error);
    }
  },

  async logout(_req: Request, res: Response, next: NextFunction) {
    try {
      return res
        .clearCookie(process.env.KEY_TOKEN)
        .status(200)
        .json({ message: "logout completed successfully!" });
    } catch (error) {
      return next(error);
    }
  },
};
