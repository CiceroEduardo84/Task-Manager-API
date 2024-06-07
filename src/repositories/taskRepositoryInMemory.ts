import { UserTasksPagination } from "../services/taskServices";
import { CreateTaskDataTypes, UpdateTaskDataTypes } from "./taskRepository";

const tasks = [
  {
    id: "1",
    title: "task1",
    description: "description",
    date: "2024-05-22T16:00:00Z",
    status: "pending",
    user_id: "1",
  },

  {
    id: "2",
    title: "task2",
    description: "description",
    date: "2024-05-22T16:00:00Z",
    status: "completed",
    user_id: "1",
  },

  {
    id: "3",
    title: "task3",
    description: "description",
    date: "2024-05-22T16:00:00Z",
    status: "pending",
    user_id: "2",
  },
];

export const taskRepositoryInMemory = {
  async createTask(data: CreateTaskDataTypes) {
    try {
      const { id, title, description, date, status, user_id } = data;

      if (status != "completed" && status != "pending") {
        throw new Error("status must be 'completed' or 'pending'!");
      }

      const task = {
        id,
        title,
        description,
        date,
        status,
        user_id,
      };

      tasks.push(task);

      return tasks[tasks.length - 1] as CreateTaskDataTypes;
    } catch (error) {
      throw error;
    }
  },

  async getTask(id: string) {
    try {
      const task = tasks.find((task) => task.id == id);
      return task as CreateTaskDataTypes;
    } catch (error) {
      throw error;
    }
  },

  async getTasks(data: UserTasksPagination) {
    try {
      const { userID, limit, offset, filter } = data;

      const userTasks = tasks.filter((task) => task.user_id === userID);

      if (filter == "all") {
        return userTasks as CreateTaskDataTypes[];
      } else {
        const filteredUserTasks = userTasks.filter((task) => task.status == filter);
        const paginatedTasks = filteredUserTasks.reverse();
        return paginatedTasks as CreateTaskDataTypes[];
      }
    } catch (error) {
      throw error;
    }
  },

  async updateTask(data: UpdateTaskDataTypes) {
    try {
      const { id, title, description, date, status, user_id, updated_at } = data;

      if (status != "completed" && status != "pending") {
        throw new Error("status must be 'completed' or 'pending'!");
      }

      const task = {
        id,
        title,
        description,
        date,
        status,
        user_id,
        updated_at,
      };

      const index = tasks.findIndex((task) => task.id == id);

      if (index == -1) return;

      tasks[index] = task;

      return tasks[index] as UpdateTaskDataTypes;
    } catch (error) {
      throw error;
    }
  },

  async deleteTaskByID(id: string) {
    try {
      const index = tasks.findIndex((task) => task.id == id);

      if (index == -1) return;

      tasks.splice(index, 1);

      return { id };
    } catch (error) {
      throw error;
    }
  },
};
