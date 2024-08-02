import { z } from "zod";

export const CreateCategoryRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  parentCategoryId: z.number().optional(),
  subcategories: z.array(z.number()).optional(),
});

export const UpdateCategoryRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  parentCategoryId: z.number().optional(),
  subcategories: z.array(z.number()).optional(),
});
