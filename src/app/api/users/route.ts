import users from "@/dummies/users_data.json";
import { CreateUserRequestSchema } from "@/validations/users";

export const GET = async (request: Request) => {
  let cloneAuthors = users;
  const url = new URL(request.url);
  const filterName = url.searchParams.get("name");

  if (filterName) {
    cloneAuthors = cloneAuthors.filter((author) =>
      author.name.toLowerCase().includes(filterName?.toLowerCase()),
    );
  }

  return Response.json({ data: cloneAuthors, status: 200 });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const valid = await CreateUserRequestSchema.safeParseAsync(body);
  if (valid.error) {
    return Response.json(
      { message: valid.error.errors, status: 400 },
      { status: 400 },
    );
  }
  users.push(body);
  return Response.json({ data: body, status: 201 }, { status: 201 });
};
