import { z } from "zod";

export const paginationSchema = z
  .object({
    limite: z
      .string({
        required_error: "Limite is required!",
        invalid_type_error: "Limite must be as string!",
      })
      .max(255, "Max limite length exceeded!")
      .regex(/^\d+$/, "Limit must have only numbers!")
      .optional(),

    offset: z
      .string({
        required_error: "Offset is required!",
        invalid_type_error: "Offset must be as string!",
      })
      .max(255, "Max limite length exceeded!")
      .regex(/^\d+$/, "Limit must have only numbers!")
      .optional(),

    filter: z.enum(["all", "pending", "completed"], {
      required_error: "Filter is required!",
      invalid_type_error: "Filter must be an 'all', 'pending' or 'completed'!",
    }),
  })
  .strict();

export type PaginationDataType = z.infer<typeof paginationSchema>;
