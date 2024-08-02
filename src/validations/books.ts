import { CreateBookRequest } from "@/types/books";
import { z } from "zod";

export const CreateBookRequestSchema = z.object({
  title: z.string(),
  authorIds: z.array(z.number()),
  isbn: z.string(),
  publishedDate: z.string(),
  quantity: z.number(),
  categoryIds: z.array(z.number()),
  description: z.string(),
  publisherId: z.number(),
  pageCount: z.number(),
  language: z.string(),
});

export const UpdateBookRequestSchema = z.object({
  title: z.string().optional(),
  authorIds: z.array(z.number()).optional(),
  isbn: z.string().optional(),
  publishedDate: z.string().optional(),
  quantity: z.number().optional(),
  categoryIds: z.array(z.number()).optional(),
  description: z.string().optional(),
  publisherId: z.number().optional(),
  pageCount: z.number().optional(),
  language: z.string().optional(),
});
