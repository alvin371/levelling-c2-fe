import { CreateBookRequest } from "@/types/books";
import { z } from "zod";

export const CreateBookRequestSchema = z.object({
  title: z.string(),
  author_ids: z.array(z.number()),
  isbn: z.string(),
  published_date: z.string(),
  quantity: z.number(),
  category_ids: z.array(z.number()),
  description: z.string(),
  publisher_id: z.number(),
  page_count: z.number(),
  language: z.string(),
});

export const UpdateBookRequestSchema = z.object({
  title: z.string().optional(),
  author_ids: z.array(z.number()).optional(),
  isbn: z.string().optional(),
  published_date: z.string().optional(),
  quantity: z.number().optional(),
  category_ids: z.array(z.number()).optional(),
  description: z.string().optional(),
  publisher_id: z.number().optional(),
  page_count: z.number().optional(),
  language: z.string().optional(),
});
