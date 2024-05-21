import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string({
        required_error: "email is required!",
        invalid_type_error: "email must be as string!",
      })
      .email("email poorly formatted!")
      .max(255, "max email length exceeded!"),

    password: z
      .string({
        required_error: "password is required!",
        invalid_type_error: "password must be as string!",
      })
      .max(255, "max password length exceeded!")
  })
  .strict();

export type LoginDataType = z.infer<typeof loginSchema>;
