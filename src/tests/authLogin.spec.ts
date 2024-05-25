import { describe, expect, it } from "vitest";
import { authServices } from "../services/authServices";
import { userRepositoryInMemory } from "../repositories/userRepositoryInMemory";
import "dotenv/config"


describe("test authentication", () => {
  const user = {
    email: "user1@email.com",
    password: "1234567"
  }
  it("should user log in", async () => {
    const login = await authServices.login(user, userRepositoryInMemory);
    expect(login).toHaveProperty("token")
  });
});
