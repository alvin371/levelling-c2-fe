import authors from "@/dummies/authors_data.json";
import { CreateAuthorRequestSchema } from "@/validations/authors";

export const GET = async (request: Request) => {
  let authorsResponse = authors;
  const url = new URL(request.url);
  const filterName = url.searchParams.get("name");
  const filterBirthdate = url.searchParams.get("birthdate");

  if (filterName) {
    authorsResponse = authorsResponse.filter((author) =>
      author.name.toLowerCase().includes(filterName?.toLowerCase()),
    );
  }

  if (filterBirthdate) {
    authorsResponse = authorsResponse.filter(
      (author) => author.birthdate === filterBirthdate,
    );
  }

  return Response.json({ data: authorsResponse, status: 200 });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const valid = await CreateAuthorRequestSchema.safeParseAsync(body);
  if (valid.error) {
    return Response.json(
      { message: valid.error.errors, status: 400 },
      { status: 400 },
    );
  }
  authors.push(body);
  return Response.json({ data: body, status: 201 }, { status: 201 });
};
