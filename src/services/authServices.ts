import { LoginDataType } from "../validations/loginSchema";
import { UserRepositoryTypes } from "./userServices";

export const authServices = {
  async login(data: LoginDataType, repository: UserRepositoryTypes) {
    try {
      const { email, password } = data;

      const user = await repository.getUserByEmail(email);
      if (!user) throw "email invalido!";

      
      return "token";
    } catch (error) {
      throw error;
    }
  },
};
