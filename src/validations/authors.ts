import z from "zod";

export const CreateAuthorRequestSchema = z.object({
  name: z.string(),
  birthdate: z.string(),
  biography: z.string(),
  nationality: z.string(),
});

export const UpdateAuthorRequestSchema = z.object({
  name: z.string().optional(),
  birthdate: z.string().optional(),
  biography: z.string().optional(),
  nationality: z.string().optional(),
});
