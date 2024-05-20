import { sqliteConnection } from "../databases/sqlite3";
import { userDataType } from "../validations/userSchema";

export type CreateUserDataType = userDataType & { id: string };

export const userRepository = {
  async createUser(data: CreateUserDataType) {
    try {
      const { id, name, email, password } = data;

      const db = await sqliteConnection();
      const querySql =
        "INSERT INTO users (id, name, email, password) VALUES (?,?,?,?);";
      await db.run(querySql, [id, name, email, password]);

      return { id };
    } catch (error) {
      throw error;
    }
  },
};
