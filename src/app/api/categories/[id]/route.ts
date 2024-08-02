import categories from "@/dummies/categories_data.json";
import { UpdateCategoryRequestSchema } from "@/validations/categories";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } },
) => {
  const category = categories.find(
    (category) => category.id.toString() === params.id,
  );
  if (!category)
    return Response.json(
      { message: "Category not found", status: 404 },
      { status: 404 },
    );
  return Response.json({ data: category, status: 200 });
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body = await request.json();
  const categoryIndex = categories.findIndex(
    (category) => category.id.toString() === params.id,
  );
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
  categories[categoryIndex] = body;
  return Response.json({ data: body }, { status: 201 });
};
