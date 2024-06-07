import { sqliteConnection } from "../databases/sqlite3";
import { appError } from "../errors/appError";
import { TaskDataCreate, UserTasksPagination } from "../services/taskServices";

export type CreateTaskDataTypes = TaskDataCreate & { id: string };
export type UpdateTaskDataTypes = CreateTaskDataTypes & { updated_at: Date };

export const taskRepository = {
  async createTask(data: CreateTaskDataTypes) {
    try {
      const { id, title, description, date, status, user_id } = data;

      const db = await sqliteConnection();

      const querySQL = `
        INSERT INTO tasks (id, title, description, date, status, user_id)
        VALUES (?, ?, ?, ?, ?, ?);
      `;

      await db.run(querySQL, [id, title, description, date, status, user_id]);

      return { id, title, description, date, status, user_id };
    } catch (error) {
      throw error;
    }
  },

  async getTask(id: string) {
    try {
      const db = await sqliteConnection();

      const quarySQL = "SELECT * FROM tasks WHERE id = ?;";
      const task = await db.get(quarySQL, [id]);

      return task;
    } catch (error) {
      throw error;
    }
  },

  async getTasks(data: UserTasksPagination) {
    try {
      const { userID, limit, offset, filter } = data;

      const db = await sqliteConnection();
      let querySQL = "";
      let tasks = [];

      switch (filter) {
        case "all":
          querySQL = `
            SELECT * FROM tasks 
            WHERE user_id = ?
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?;
          `;
          tasks = await db.all(querySQL, [userID, limit, offset]);
          break;

        case "completed":
          querySQL = `
            SELECT * FROM tasks 
            WHERE user_id = ? AND status = 'completed'
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?;
          `;
          tasks = await db.all(querySQL, [userID, limit, offset]);
          break;

        case "pending":
          querySQL = `
            SELECT * FROM tasks 
            WHERE user_id = ? AND status = 'pending' AND date >= CURRENT_DATE
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?;
          `;
          tasks = await db.all(querySQL, [userID, limit, offset]);
          break;

        case "late":
          querySQL = `
            SELECT * FROM tasks 
            WHERE user_id = ? AND status = 'pending' AND date < CURRENT_DATE
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?;
          `;
          tasks = await db.all(querySQL, [userID, limit, offset]);
          break;

        default:
          throw appError("invalid filter!", 400);
      }

      return tasks;
    } catch (error) {
      throw error;
    }
  },

  async updateTask(data: UpdateTaskDataTypes) {
    try {
      const { id, title, description, date, status, user_id, updated_at } = data;

      const db = await sqliteConnection();

      const querySQL = `
        UPDATE tasks 
        SET title = ?, description = ?, date = ?, status = ?, updated_at = ?
        WHERE id = ?;
      `;

      await db.run(querySQL, [title, description, date, status, updated_at, id]);

      return { id, title, description, date, status, user_id, updated_at };
    } catch (error) {
      throw error;
    }
  },

  async deleteTaskByID(id: string) {
    try {
      const db = await sqliteConnection();

      const querySQL = "DELETE FROM tasks WHERE id = ?;";
      await db.run(querySQL, [id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },
};
