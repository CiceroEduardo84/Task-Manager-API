import { CreateUserDataType } from "../repositories/userRepository";
import { userDataType } from "../validations/userSchema";
import { randomUUID } from "node:crypto";
import { hash } from "bcrypt";

type Repository = {
  createUser(data: CreateUserDataType): Promise<{} | undefined>
}

export const userServices = {
  async create(data: userDataType, repository:Repository) {
    try {
      const { name, email, password } = data;

      const passwordHash = await hash(password, 10);
      const user = { id: randomUUID(), name, email, password: passwordHash };

      const userCreated = await repository.createUser(user)

      return userCreated;
    } catch (error) {
      throw error;
    }
  },
};
