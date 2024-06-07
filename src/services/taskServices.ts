import { randomUUID } from "node:crypto";
import { appError } from "../errors/appError";
import { TaskDataTypes } from "../validations/taskSchema";
import { PaginationDataTypes } from "../validations/paginationSchema";
import { CreateTaskDataTypes, UpdateTaskDataTypes } from "../repositories/taskRepository";

export type TaskDataCreate = TaskDataTypes & { user_id: string };
export type UserTasksPagination = PaginationDataTypes & { userID: string };

type Repository = {
  createTask(data: TaskDataCreate): Promise<CreateTaskDataTypes | undefined>;
  getTask(id: string): Promise<CreateTaskDataTypes | undefined>;
  getTasks(data: UserTasksPagination): Promise<CreateTaskDataTypes[] | undefined>;
  updateTask(data: UpdateTaskDataTypes): Promise<UpdateTaskDataTypes | undefined>;
  deleteTaskByID(id: string): Promise<{ id: string } | undefined>;
};

export const taskServices = {
  async create(data: TaskDataCreate, repository: Repository) {
    try {
      const { title, description, date, status, user_id } = data;

      if (new Date(date) < new Date()) {
        throw appError("date cannot be before the current time!", 400);
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        date,
        status: status || "pending",
        user_id,
      };

      const taskCreated = await repository.createTask(task);

      return taskCreated;
    } catch (error) {
      throw error;
    }
  },

  async read(data: UserTasksPagination, repository: Repository) {
    try {
      const { userID, limit, offset, filter } = data;

      if (!limit || !offset || !filter) {
        throw appError("please inform query params limit, offset and filter!", 400);
      }

      const userTasks = await repository.getTasks({ userID, limit, offset, filter });

      return userTasks;
    } catch (error) {
      throw error;
    }
  },

  async update(id: string, data: TaskDataCreate, repository: Repository) {
    try {
      const { title, description, date, status, user_id } = data;

      if (new Date(date) < new Date()) {
        throw appError("date cannot be before the current time!", 400);
      }

      const task = await repository.getTask(id);
      if (!task) throw appError("task not found!", 404);

      if (task.user_id != user_id) {
        throw appError("user not authorized to update task!", 401);
      }

      const taskToUpdate = {
        id,
        title,
        description,
        date,
        status: status || "pending",
        user_id,
        updated_at: new Date(),
      };

      const taskUpdate = await repository.updateTask(taskToUpdate);

      return taskUpdate;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: string, user_id: string, repository: Repository) {
    try {
      const task = await repository.getTask(id);
      if (!task) throw appError("task not found!", 404);

      if (task.user_id != user_id) {
        throw appError("user not authorized to delete task!", 401);
      }

      const taskDeleted = await repository.deleteTaskByID(id);

      if (!taskDeleted) throw appError("task not deleted!", 500);

      return taskDeleted;
    } catch (error) {
      throw error;
    }
  },
};
