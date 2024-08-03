import categories from "@/dummies/categories_data.json";
import { NotFoundException } from "@/utils/exceptions";
import { getErrorStatus } from "@/utils/request";
import { UpdateCategoryRequestSchema } from "@/validations/categories";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const category = categories.find(
      (category) => category.id.toString() === params.id,
    );
    if (!category) throw NotFoundException("Category not found");
    return Response.json({ data: category, status: 200 });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body = await request.json();
  const categoryIndex = categories.findIndex(
    (category) => category.id.toString() === params.id,
  );
  try {
    if (categoryIndex < 0)
      return Response.json(
        { message: "Category not found", status: 404 },
        { status: 404 },
      );

    const valid = UpdateCategoryRequestSchema.safeParse(body);
    if (valid.error) {
      return Response.json(
        { message: valid.error.errors, status: 400 },
        { status: 400 },
      );
    }
    const data = categories[categoryIndex];
    if (valid.data.name) data.name = valid.data.name;
    if (valid.data.description) data.description = valid.data.description;
    if (valid.data.parentCategoryId) {
      const parentCategory = categories.find(
        (category) => category.id === valid.data.parentCategoryId,
      );
      if (parentCategory === undefined)
        throw NotFoundException("Parent category not found");
      data.parentCategory = {
        id: parentCategory.id,
        name: parentCategory.name,
      };
    }
    if (valid.data.subcategoryIds) {
      data.subcategories = valid.data.subcategoryIds.map((id) => {
        const subcategory = categories.find((category) => category.id === id);
        if (subcategory === undefined)
          throw NotFoundException("Subcategory not found");
        return {
          id,
          name: subcategory.name,
        };
      });
    }
    return Response.json({ data, status: 201 }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};
