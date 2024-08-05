import categories from "@/dummies/categories_data.json";
import { NotFoundException, ZodIssueException } from "@/utils/exceptions";
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
    if (categoryIndex < 0) throw NotFoundException("Category not found");

    const valid = UpdateCategoryRequestSchema.safeParse(body);
    if (valid.error) throw ZodIssueException(valid.error.errors);

    const data = categories[categoryIndex];
    if (valid.data.name) data.name = valid.data.name;
    if (valid.data.description) data.description = valid.data.description;
    if (valid.data.parent_category_id) {
      const parentCategory = categories.find(
        (category) => category.id === valid.data.parent_category_id,
      );
      if (parentCategory === undefined)
        throw NotFoundException("Parent category not found");
      data.parent_category = {
        id: parentCategory.id,
        name: parentCategory.name,
      };
    }
    if (valid.data.subcategory_ids) {
      data.subcategories = valid.data.subcategory_ids.map((id) => {
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

export const DELETE = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const categoryIndex = categories.findIndex(
      (category) => category.id.toString() === params.id,
    );
    if (categoryIndex < 0) throw NotFoundException("Category not found");

    return Response.json({
      data: `Category with id ${params.id} deleted`,
      status: 200,
    });
  } catch (error) {
    return Response.json(error, { status: getErrorStatus(error) });
  }
};
