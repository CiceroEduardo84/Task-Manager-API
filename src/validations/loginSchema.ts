import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string({
        required_error: "email is required!",
        invalid_type_error: "email must be a string!",
      })
      .email({ message: "email badly formatted!" })
      .max(255, "max email length exceeded!"),

    password: z
      .string({
        required_error: "password is required!",
        invalid_type_error: "password must be a string!",
      })
      .max(255, "max password length exceeded!"),
  })
  .strict();

export type LoginDataTypes = z.infer<typeof loginSchema>;
