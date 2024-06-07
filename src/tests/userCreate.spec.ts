import { describe, it, expect } from "vitest";
import { userRepositoryInMemory } from "../repositories/userRepositoryInMemory";
import { userServices } from "../services/userServices";

describe("test create user functions", async () => {
  const user = {
    name: "Emanuel Quintino",
    email: "emanuelquintino@hotmail.com",
    password: "1234567",
  };

  it("should create a user!", async () => {
    const userCreated = await userServices.create(user, userRepositoryInMemory);
    expect(userCreated?.email).toEqual(user.email);
    expect(userCreated).toHaveProperty("id");
  });

  it("should not create user if email already exists!", async () => {
    try {
      const userCreated = await userServices.create(user, userRepositoryInMemory);
      if (userCreated) throw new Error("expected an error but the user was created!");
    } catch (error: any) {
      expect(error.message).toBe("email already exists!");
    }
  });
});
