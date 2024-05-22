import { randomUUID } from "node:crypto";
import { TaskDataType } from "../validations/taskSchema";

export type CreateTaskDataTypes = TaskDataType & { idUser: string };

export type TaskRepositoryTypes = {
  createTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  getTask(id: string): Promise<CreateTaskDataTypes | undefined>;
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
};
