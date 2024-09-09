import z from "zod";

export const CreateUserRequestSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  membership_date: z.string(),
  status: z.string(),
  borrowing_ids: z.array(z.number()),
});

export const UpdateUserRequestSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  membership_date: z.string().optional(),
  status: z.string().optional(),
  borrowing_ids: z.array(z.number()).optional(),
});
