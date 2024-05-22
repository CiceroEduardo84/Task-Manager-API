import { z } from "zod";

export const taskSchema = z
  .object({
    title: z
      .string({
        required_error: "Title is required!",
        invalid_type_error: "Title must be as string!",
      })
      .min(3, "Title must have at least 3 characters!")
      .max(255, "Max title length exceeded!"),

    description: z
      .string({
        required_error: "Description is required!",
        invalid_type_error: "Description must be as string!",
      })
      .min(3, "Description must have at least 3 characters!")
      .max(255, "Max description length exceeded!"),

    date: z
      .string({
        required_error: "Date is required!",
        invalid_type_error: "Date must be as string!",
      })
      .datetime({ message: "Date must be UTC format" }),

    status: z.enum(["pending", "completed"],{
      required_error: "Status is required!",
      invalid_type_error: "Status must be as 'pending' or 'completed'!",
    }),
  })
  .strict();

export type taskDataType = z.infer<typeof taskSchema>;
