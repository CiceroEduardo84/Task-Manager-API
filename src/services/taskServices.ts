import { randomUUID } from "node:crypto";
import { TaskDataType } from "../validations/taskSchema";
import { appError } from "../errors/appError";
import { PaginationDataType } from "../validations/paginationSchema";

export type CreateTaskDataTypes = TaskDataType & { idUser: string };
export type UpdateTaskDataTypes = TaskDataType & { id_user: string };
export type UserTaskPagination = PaginationDataType & { userID: string };

export type TaskRepositoryTypes = {
  createTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  getTask(id: string): Promise<UpdateTaskDataTypes | undefined>;
  getTasks(data:UserTaskPagination): Promise<CreateTaskDataTypes[] | undefined>;
  updateTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  deleteTask(id: string): Promise<{} | undefined>;
};

export const taskServices = {
  async create(data: CreateTaskDataTypes, repository: TaskRepositoryTypes) {
    try {
      const { title, description, date, status, idUser } = data;

      const user = {
        id: randomUUID(),
        title,
        description,
        date,
        status,
        idUser,
      };

      const taskCreated = await repository.createTask(user);

      return taskCreated;
    } catch (error) {
      throw error;
    }
  },

  async read(data: UserTaskPagination, repository: TaskRepositoryTypes) {
    try {
      const { userID, filter, limite, offset } = data;

      if (!filter || !offset || !limite) {
        throw appError("Please inform filter, limit and offset", 400);
      }

      const userTasks = await repository.getTasks({
        userID,
        filter,
        limite,
        offset,
      });

      return userTasks;
    } catch (error) {
      throw error;
    }
  },

  async update(
    taskId: string,
    data: CreateTaskDataTypes,
    repository: TaskRepositoryTypes
  ) {
    try {
      const { title, description, date, status, idUser } = data;

      const task = {
        id: taskId,
        title,
        description,
        date,
        status,
        idUser,
      };

      const userTask = await repository.getTask(taskId);
      if (!userTask) throw appError("Task not found!", 404);

      if (userTask.id_user != idUser) {
        throw appError("User not authorized to update task", 401);
      }
      const taskUpdated = await repository.updateTask(task);

      return taskUpdated;
    } catch (error) {
      throw error;
    }
  },

  async delete(
    taskId: string,
    userID: string,
    repository: TaskRepositoryTypes
  ) {
    try {
      const userTask = await repository.getTask(taskId);
      if (!userTask) throw appError("Task not found!", 404);

      if (userTask.id_user != userID) {
        console.log(userTask.id_user);
        console.log(userTask);

        throw appError("User not authorized to delete task", 401);
      }
      const taskDelete = await repository.deleteTask(taskId);
      if (!taskDelete) throw appError("Task not deleted!", 500);

      return taskDelete;
    } catch (error) {
      throw error;
    }
  },
};
