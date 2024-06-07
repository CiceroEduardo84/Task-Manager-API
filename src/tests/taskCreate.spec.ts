import { describe, it, expect, beforeEach } from "vitest";
import { TaskDataCreate, taskServices } from "../services/taskServices";
import { taskRepositoryInMemory } from "../repositories/taskRepositoryInMemory";

describe("test create task functions", async () => {
  const task = {
    title: "task test",
    description: "description test",
    date: "2024-05-22T00:00:00Z",
    user_id: "1",
  } as TaskDataCreate;

  const futureDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(); // now + 1d

  it("should create a task!", async () => {
    const taskCreated = await taskServices.create(
      { ...task, date: futureDate },
      taskRepositoryInMemory
    );

    expect(taskCreated?.title).toEqual(task.title);
    expect(taskCreated).toHaveProperty("id");
    expect(taskCreated).toHaveProperty("status");
  });

  it("should not create task if date be before the current time!", async () => {
    try {
      const pastDate = new Date("2024-05-23T00:00:00Z").toISOString();
      const taskCreated = await taskServices.create(
        { ...task, date: pastDate },
        taskRepositoryInMemory
      );

      if (taskCreated) throw new Error("expected an error but the task was created!");
    } catch (error: any) {
      expect(error.message).toBe("date cannot be before the current time!");
    }
  });
});
