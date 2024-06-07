import { describe, it, expect } from "vitest";
import { taskServices } from "../services/taskServices";
import { taskRepositoryInMemory } from "../repositories/taskRepositoryInMemory";

describe("test read tasks functions", async () => {
  it("should read user tasks by userID!", async () => {
    const userTasks = await taskServices.read(
      { userID: "1", limit: "2", offset: "0", filter: "all" },
      taskRepositoryInMemory
    );

    expect(userTasks).toBeTruthy();

    userTasks?.forEach((task) => {
      expect(task.user_id).toBe("1");
    });
  });

  it("should not read user tasks without limit, offset or filter!", async () => {
    try {
      const userTasks = await taskServices.read({ userID: "1" }, taskRepositoryInMemory);

      if (userTasks) throw new Error("expected an error but the user tasks was read!");
    } catch (error: any) {
      expect(error.message).toBe("please inform query params limit, offset and filter!");
    }
  });
});
