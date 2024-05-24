import { sqliteConnection } from "../databases/sqlite3";
import {
  CreateTaskDataTypes,
  UserTaskPagination,
} from "../services/taskServices";

type CreateTaskTypes = CreateTaskDataTypes & { id: string };

export const taskRepository = {
  async createTask(data: CreateTaskTypes) {
    try {
      const { id, title, description, date, status, idUser } = data;

      const db = await sqliteConnection();
      const querySql =
        "INSERT INTO tasks (id, title, description, date, status, id_user ) VALUES (?,?,?,?,?,?);";
      await db.run(querySql, [id, title, description, date, status, idUser]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async getTask(id: string) {
    try {
      const db = await sqliteConnection();
      const querySql = "SELECT * FROM tasks WHERE id = ?;";
      const task = await db.get(querySql, [id]);

      return task;
    } catch (error) {
      throw error;
    }
  },

  async updateTask(data: CreateTaskTypes) {
    try {
      const { id, title, description, date, status } = data;

      const db = await sqliteConnection();
      const querySql = `
        UPDATE tasks 
        SET title = ?, description = ?, date = ?, status = ?
        WHERE id = ?;
        `;

      await db.run(querySql, [title, description, date, status, id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async deleteTask(id: string) {
    try {
      const db = await sqliteConnection();
      const querySql = "DELETE FROM tasks WHERE id = ?";

      await db.run(querySql, [id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async getTasks(data: UserTaskPagination) {
    try {
      const { userID, filter, limite, offset } = data;

      const db = await sqliteConnection();

      if (filter == "all") {
        const querySql = `
        SELECT * FROM tasks 
        WHERE id_user = ? 
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?;
      `;

        const userTasks = await db.all(querySql, [userID, limite, offset]);

        return userTasks;
      } else {
        const querySql = `
        SELECT * FROM tasks 
        WHERE id_user = ? AND status = ? 
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?;
      `;

        const userTasks = await db.all(querySql, [
          userID,
          filter,
          limite,
          offset,
        ]);

        return userTasks;
      }
    } catch (error) {
      throw error;
    }
  },
};
