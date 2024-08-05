import { z } from "zod";

export const CreateBorrowingRequestSchema = z.object({
  user_id: z.number(),
  book_id: z.number(),
  borrowed_date: z.string(),
  return_date: z.string(),
  status: z.string(),
});

export const UpdateBorrowingRequestSchema = z.object({
  user_id: z.number().optional(),
  book_id: z.number().optional(),
  borrowed_date: z.string().optional(),
  return_date: z.string().optional(),
  status: z.string().optional(),
});
