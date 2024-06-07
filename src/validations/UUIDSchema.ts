import { z } from "zod";

export function UUIDSchema(name: string) {
  return z.object({
    id: z
      .string({
        required_error: `${name} ID is required!`,
        invalid_type_error: `${name} ID must be a string!`,
      })
      .uuid({ message: `invalid ${name} ID!` }),
  });
}
