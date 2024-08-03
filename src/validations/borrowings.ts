import { z } from "zod";

export const CreateBorrowingRequestSchema = z.object({
  userId: z.number(),
  bookId: z.number(),
  borrowedDate: z.string(),
  returnDate: z.string(),
  status: z.string(),
});

export const UpdateBorrowingRequestSchema = z.object({
  userId: z.number().optional(),
  bookId: z.number().optional(),
  borrowedDate: z.string().optional(),
  returnDate: z.string().optional(),
  status: z.string().optional(),
});
