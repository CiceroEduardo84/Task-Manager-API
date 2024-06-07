import { describe, it, expect } from "vitest";
import { userRepositoryInMemory } from "../repositories/userRepositoryInMemory";
import { authServices } from "../services/authServices";
import "dotenv/config";

describe("test authentication login functions", async () => {
  const user = {
    email: "user1@email.com",
    password: "1234567",
  };

  it("should log the user in!", async () => {
    const login = await authServices.login(user, userRepositoryInMemory);
    expect(login).toHaveProperty("token");
  });

  it("should not log user in with invalid email!", async () => {
    try {
      const token = await authServices.login(
        { ...user, email: "invalid" },
        userRepositoryInMemory
      );

      if (token) {
        throw new Error("expected email invalid error but the user was logged!");
      }
    } catch (error: any) {
      expect(error.message).toBe("email or password invalid!");
    }
  });

  it("should not log user in with invalid password!", async () => {
    try {
      const token = await authServices.login(
        { ...user, password: "invalid" },
        userRepositoryInMemory
      );

      if (token) {
        throw new Error("expected password invalid error but the user was logged!");
      }
    } catch (error: any) {
      expect(error.message).toBe("email or password invalid!");
    }
  });
});
