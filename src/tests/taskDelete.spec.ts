import { describe, it, expect, beforeEach } from "vitest";
import { taskServices } from "../services/taskServices";
import { taskRepositoryInMemory } from "../repositories/taskRepositoryInMemory";

describe("test delete task functions", async () => {
  it("should delete task!", async () => {
    const taskDeleted = await taskServices.delete("1", "1", taskRepositoryInMemory);

    expect(taskDeleted.id).toEqual("1");
  });

  it("should not delete task if task not found!", async () => {
    try {
      const taskDeleted = await taskServices.delete("id", "1", taskRepositoryInMemory);

      if (taskDeleted) throw new Error("expected an error but the task was deleted!");
    } catch (error: any) {
      expect(error.message).toBe("task not found!");
    }
  });

  it("should not delete task if user does not have authorization!", async () => {
    try {
      const taskDeleted = await taskServices.delete("2", "2", taskRepositoryInMemory);

      if (taskDeleted) throw new Error("expected an error but the task was deleted!");
    } catch (error: any) {
      expect(error.message).toBe("user not authorized to delete task!");
    }
  });
});
