import categories from "@/dummies/categories_data.json";
import { CategoryResponse } from "@/types/categories";
import { NotFoundException } from "@/utils/exceptions";
import { createApi, search, sort } from "@/utils/filter";
import { getErrorStatus } from "@/utils/request";
import { CreateCategoryRequestSchema } from "@/validations/categories";

export const GET = createApi(categories, [
  search({ fields: ["name", "description"] }),
  sort({ fields: ["id", "name"] }),
]);

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const valid = await CreateCategoryRequestSchema.safeParseAsync(body);
    if (valid.error) {
      return Response.json(
        { message: valid.error.errors, status: 400 },
        { status: 400 },
      );
    }
    const parentCategory = categories.find(
      (category) => category.id === valid.data.parent_category_id,
    );
    if (
      parentCategory === undefined &&
      valid.data.parent_category_id !== undefined
    )
      throw NotFoundException("Parent category not found");

    const data: CategoryResponse = {
      id: categories.length + 1,
      name: valid.data.name,
      description: valid.data.description,
      parent_category: parentCategory
        ? {
            id: parentCategory.id,
            name: parentCategory.name,
          }
        : undefined,
      subcategories: valid.data.subcategory_ids?.map((id) => {
        const subcategory = categories.find((category) => category.id === id);
        if (subcategory === undefined)
          throw NotFoundException("Subcategory not found");
        return {
          id,
          name: subcategory.name,
        };
      }),
    };
    return Response.json({ data, status: 201 }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};
