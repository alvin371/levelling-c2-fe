import categories from "@/dummies/categories_data.json";
import { CategoryResponse } from "@/types/categories";
import { NotFoundException } from "@/utils/exceptions";
import { getErrorStatus } from "@/utils/request";
import { CreateCategoryRequestSchema } from "@/validations/categories";

export const GET = async (request: Request) => {
  let categoriesResponse = categories;
  const url = new URL(request.url);
  const filterName = url.searchParams.get("name");

  if (filterName) {
    categoriesResponse = categoriesResponse.filter((author) =>
      author.name.toLowerCase().includes(filterName?.toLowerCase()),
    );
  }

  return Response.json({
    data: {
      categories: categoriesResponse,
    },
    status: 200,
  });
};

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
      (category) => category.id === valid.data.parentCategoryId,
    );
    if (
      parentCategory === undefined &&
      valid.data.parentCategoryId !== undefined
    )
      throw NotFoundException("Parent category not found");

    const data: CategoryResponse = {
      id: categories.length + 1,
      name: valid.data.name,
      description: valid.data.description,
      parentCategory: parentCategory
        ? {
            id: parentCategory.id,
            name: parentCategory.name,
          }
        : undefined,
      subcategories: valid.data.subcategoryIds?.map((id) => {
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
