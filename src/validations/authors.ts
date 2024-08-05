import z from "zod";

export const CreateAuthorRequestSchema = z.object({
  name: z.string(),
  birthdate: z.string(),
  biography: z.string(),
  nationality: z.string(),
  book_ids: z.array(z.number()),
});

export const UpdateAuthorRequestSchema = z.object({
  name: z.string().optional(),
  birthdate: z.string().optional(),
  biography: z.string().optional(),
  nationality: z.string().optional(),
  book_ids: z.array(z.number()).optional(),
});
