import { describe, it, expect } from "vitest";
import { TaskDataCreate, taskServices } from "../services/taskServices";
import { taskRepositoryInMemory } from "../repositories/taskRepositoryInMemory";

describe("test update task functions", async () => {
  const task = {
    title: "task update",
    description: "description",
    date: "2024-05-22T00:00:00Z",
    status: "pending",
    user_id: "1",
  } as TaskDataCreate;

  const futureDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(); // now + 1d

  it("should update a task!", async () => {
    const taskUpdated = await taskServices.update(
      "1",
      { ...task, date: futureDate },
      taskRepositoryInMemory
    );

    expect(taskUpdated?.date).toEqual(futureDate);
    expect(taskUpdated?.title).toEqual(task.title);
  });

  it("should not update task if date be before the current time!", async () => {
    try {
      const pastDate = new Date("2024-05-23T00:00:00Z").toISOString();
      const taskUpdated = await taskServices.update(
        "1",
        { ...task, date: pastDate },
        taskRepositoryInMemory
      );

      if (taskUpdated) throw new Error("expected an error but the task was updated!");
    } catch (error: any) {
      expect(error.message).toBe("date cannot be before the current time!");
    }
  });

  it("should not update task if task not found!", async () => {
    try {
      const taskUpdated = await taskServices.update(
        "id",
        { ...task, date: futureDate },
        taskRepositoryInMemory
      );

      if (taskUpdated) throw new Error("expected an error but the task was updated!");
    } catch (error: any) {
      expect(error.message).toBe("task not found!");
    }
  });

  it("should not update task if user does not have authorization!", async () => {
    try {
      const taskUpdated = await taskServices.update(
        "3",
        { ...task, date: futureDate },
        taskRepositoryInMemory
      );

      if (taskUpdated) throw new Error("expected an error but the task was updated!");
    } catch (error: any) {
      expect(error.message).toBe("user not authorized to update task!");
    }
  });
});
