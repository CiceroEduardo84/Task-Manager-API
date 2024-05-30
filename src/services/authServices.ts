import { compare } from "bcrypt";
import { appError } from "../errors/appError";
import { LoginDataType } from "../validations/loginSchema";
import { UserRepositoryTypes } from "./userServices";
import { sign } from "jsonwebtoken";

export const authServices = {
  async login(data: LoginDataType, repository: UserRepositoryTypes) {
    try {
      const { email, password } = data;

      const user = await repository.getUserByEmail(email);
      if (!user) throw appError("Email or password invalid!", 401);

      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck) throw appError("Email or password invalid!", 401);

      const token = sign({id: user.id}, process.env.SECRET_TOKEN, {
        expiresIn: process.env.EXPIRESIN_TOKEN
      } );

      return {token, id: user.id};
    } catch (error) {
      throw error;
    }
  },
};
