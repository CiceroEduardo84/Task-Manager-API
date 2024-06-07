import { describe, it, expect } from "vitest";
import { userRepositoryInMemory } from "../repositories/userRepositoryInMemory";
import { userServices } from "../services/userServices";

describe("test read user functions", async () => {
  it("should read a user by ID!", async () => {
    const user = await userServices.read("1", userRepositoryInMemory);
    expect(user).toHaveProperty("id");
    expect(user).not.toHaveProperty("password");
  });

  it("should not found user!", async () => {
    try {
      const user = await userServices.read("userID", userRepositoryInMemory);
      if (user) throw new Error("expected an error but the user was found!");
    } catch (error: any) {
      expect(error.message).toBe("user not found!");
    }
  });
});
