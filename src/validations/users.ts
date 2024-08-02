import z from "zod";

export const CreateUserRequestSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  membershipDate: z.string(),
  status: z.string(),
  borrowings: z.array(
    z.object({
      id: z.number(),
      bookTitle: z.string(),
    }),
  ),
});

export const UpdateUserRequestSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  membershipDate: z.string().optional(),
  status: z.string().optional(),
  borrowings: z
    .array(
      z.object({
        id: z.number(),
        bookTitle: z.string(),
      }),
    )
    .optional(),
});
