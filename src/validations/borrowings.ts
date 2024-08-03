import { z } from "zod";

export const CreateBorrowingRequestSchema = z.object({
  userId: z.number(),
  bookId: z.number(),
  borrowedDate: z.string(),
  returnDate: z.string(),
  status: z.string(),
  user: z.number(),
  book: z.number(),
});

export const UpdateBorrowingRequestSchema = z.object({
  userId: z.number().optional(),
  bookId: z.number().optional(),
  borrowedDate: z.string().optional(),
  returnDate: z.string().optional(),
  status: z.string().optional(),
  user: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  book: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .optional(),
});
