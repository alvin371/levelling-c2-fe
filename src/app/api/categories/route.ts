import categories from "@/dummies/categories_data.json";
import { CreateCategoryRequestSchema } from "@/validations/categories";

export const GET = async (request: Request) => {
  let cloneCategories = categories;
  const url = new URL(request.url);
  const filterName = url.searchParams.get("name");

  if (filterName) {
    cloneCategories = cloneCategories.filter((author) =>
      author.name.toLowerCase().includes(filterName?.toLowerCase()),
    );
  }

  return Response.json({ data: cloneCategories, status: 200 });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const valid = await CreateCategoryRequestSchema.safeParseAsync(body);
  if (valid.error) {
    return Response.json(
      { message: valid.error.errors, status: 400 },
      { status: 400 },
    );
  }
  categories.push(body);
  return Response.json({ data: body, status: 201 }, { status: 201 });
};
